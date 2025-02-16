import { useStorage } from '@plasmohq/storage/hook'
import '~style.css'

const Popup = () => {
  const [autoSubmitEnabled, setAutoSubmitEnabled] = useStorage('auto_submit_enabled', false)

  const openLogsPage = () => {
    chrome.tabs.create({
      url: './tabs/logs.html'
    })
  }

  return (
    <div className="w-80 bg-dark-primary text-sm">
      <div className="w-full px-4 bg-dark-secondary shadow-lg overflow-hidden rounded-b-xl">
        <div className="flex items-center justify-between text-gray-400 pt-3 pb-1">
          <span className="text-lg">Dobby Arena AI Plugin</span>
        </div>

        <div className="py-5">
          {/* 选项 - 采用胶囊式开关 */}
          <div className="flex justify-between items-center">
            <span className="text-light-primary">自动提交</span>
            <button
              onClick={() => setAutoSubmitEnabled(!autoSubmitEnabled)}
              className={`relative w-10 h-4.5 flex items-center rounded-full p-1 transition-colors
                ${autoSubmitEnabled ? 'bg-primary' : 'bg-gray-600'}`}
            >
              <div
                className={`w-3 h-3 bg-white rounded-full shadow-md transition-transform
                ${autoSubmitEnabled ? 'translate-x-5' : 'translate-x-0'}`}
              />
            </button>
          </div>

          <button
            onClick={() => openLogsPage()}
            className="w-full py-2 mt-5 bg-primary text-white rounded-lg hover:bg-primary-hover transition-colors"
          >
            查看日志
          </button>
        </div>
      </div>

      <div className="px-4 py-2.5">
        <div className="flex justify-center cursor-pointer">
          <a
            href="https://x.com/kunsect7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-light-secondary hover:underline"
          >
            @kunsect
          </a>
        </div>
      </div>
    </div>
  )
}

export default Popup
