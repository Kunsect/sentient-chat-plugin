import { Storage } from '@plasmohq/storage'

const storage = new Storage()

export const waittingBetween = (minMs: number, maxMs: number) =>
  new Promise((resolve) => setTimeout(resolve, Math.floor(Math.random() * (maxMs - minMs)) + minMs))

export const arraysAreEqualByKey = (arr1: any[], arr2: any[], key: string) => {
  if (arr1.length !== arr2.length) return false

  for (let i = 0; i < arr1.length; i++) {
    if (JSON.stringify(arr1[i][key]) !== JSON.stringify(arr2[i][key])) return false
  }

  return true
}

export const logMessage = async (message: Object) => {
  const logs = (await storage.get<string[]>('logs')) || []
  logs.push(JSON.stringify({ time: new Date().toISOString(), ...message }))
  await storage.set('logs', logs)
}
