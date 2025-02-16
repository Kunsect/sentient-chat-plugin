import type { PlasmoCSConfig } from 'plasmo'
import { arraysAreEqualByKey, logMessage, waittingBetween } from '~utils'
import { Storage } from '@plasmohq/storage'

export const config: PlasmoCSConfig = {
  matches: ['https://dobby-arena.sentient.xyz/*']
}

const storage = new Storage()

let hasRemainingMessages = true

const pooling = async () => {
  while (hasRemainingMessages) {
    const autoSubmitEnabled = await storage.get('auto_submit_enabled')
    if (!autoSubmitEnabled) return

    const firstH1Tag = document.querySelector('h1')
    const isMainPage = firstH1Tag && firstH1Tag.innerText === 'What can I help you with today?'
    const isChatPage = window.location.href.includes('?chatId=')

    if (isMainPage) {
      handleCreateChat()
    } else if (isChatPage) {
      const hasVoteContainer = !document.querySelector('div.opacity-0.h-0.overflow-hidden')

      if (hasVoteContainer) handleVoting()
      else resendChat()
    }

    await waittingBetween(4000, 8000)
  }
}

const handleCreateChat = async () => {
  const remainingMessagesFirstChat = (document.querySelector('p.text-right') as HTMLElement).innerText.charAt(0)

  if (parseInt(remainingMessagesFirstChat) <= 0) return

  const createChatBtn = document.querySelector('button.rounded-lg') as HTMLElement

  createChatBtn.click()
}

const handleVoting = async () => {
  const buttons = document.querySelectorAll('.my-1 button')

  if (buttons.length) {
    const randomButton = buttons[Math.floor(Math.random() * buttons.length)] as HTMLElement

    randomButton.click()

    logMessage({ response: randomButton.innerText })
  }
}

const resendChat = async () => {
  const remainingMesssagesContainer = document.querySelector('p.text-xs.text-muted-foreground') as HTMLElement
  if (!remainingMesssagesContainer) return

  const remainingMessagesFirstChat = remainingMesssagesContainer.innerText.charAt(0)
  if (parseInt(remainingMessagesFirstChat) <= 0) return

  const sendChatBtn = document.querySelector('button.size-7') as HTMLElement
  sendChatBtn.click()
  setTimeout(() => sendChatBtn.click())
}

pooling()
