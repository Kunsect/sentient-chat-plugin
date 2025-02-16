import { useStorage } from '@plasmohq/storage/hook'
import '~style.css'

const formatTime = (time: string) => {
  const date = new Date(time)
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')

  return `${month}.${day} ${hours}:${minutes}`
}

const LogsDisplay: React.FC = () => {
  const [logs, setLogs] = useStorage<any[]>('logs', [])

  let parsedLogs = logs.map((item) => JSON.parse(item))

  return (
    <div className="min-h-screen bg-[#12151e] text-white p-6 font-sans">
      <div className="mb-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Question Logs</h2>
        <button
          onClick={() => setLogs([])}
          className="text-sm py-2 px-4 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
        >
          清除日志
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full rounded-lg overflow-hidden table-auto text-sm">
          <thead className="bg-[#222839] text-gray-400">
            <tr>
              <th className="p-4 text-center text-lg">#</th>
              <th className="p-4 text-center text-lg">Time</th>
              <th className="px-6 py-4 text-center text-lg">Answer</th>
            </tr>
          </thead>
          <tbody>
            {parsedLogs.map((log, index) => (
              <tr key={index} className={`${index % 2 === 0 ? 'bg-[#2c3349]' : 'bg-[#222839]'}`}>
                <td className="p-4 text-center">
                  <span>{index}</span>
                </td>
                <td className="p-4 text-center whitespace-nowrap">{formatTime(log.time)}</td>
                <td className="px-6 py-4 text-center">{log.response}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default LogsDisplay
