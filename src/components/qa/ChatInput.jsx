import { Link } from 'react-router-dom'

function ChatInput({ message, setMessage }) {
  const quickPrompts = [
    { label: 'Summarise legal evidence', icon: 'fa-compress', color: 'blue' },
    { label: 'Explain policy impact', icon: 'fa-chart-line', color: 'purple' },
    { label: 'Show supporting & opposing arguments', icon: 'fa-balance-scale', color: 'green' }
  ]

  return (
    <div className="border-t border-gray-200 bg-white p-4">
      <div className="max-w-5xl mx-auto">
        {/* Quick Prompts */}
        <div className="mb-3">
          <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center">
            <i className="fa-solid fa-lightbulb mr-2 text-yellow-500"></i>
            Quick Prompts
          </h4>
          <div className="flex gap-2 flex-wrap">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                className={`px-3 py-1.5 bg-${prompt.color}-50 text-${prompt.color}-700 text-xs font-medium rounded-full hover:bg-${prompt.color}-100 transition border border-${prompt.color}-200`}
              >
                <i className={`fa-solid ${prompt.icon} mr-1`}></i>
                {prompt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Input Area */}
        <div className="flex items-end gap-3">
          <div className="flex-1 relative">
            <textarea
              rows="3"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask about a policy, law, event, or evidence..."
              className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-600 focus:border-blue-600 resize-none text-sm"
            ></textarea>
            <button className="absolute bottom-3 right-3 text-gray-400 hover:text-gray-600 transition">
              <i className="fa-solid fa-paperclip text-lg"></i>
            </button>
          </div>
          <button className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 transition flex items-center gap-2 h-fit">
            <i className="fa-solid fa-paper-plane"></i>
            Ask
          </button>
        </div>

        {/* Footer Info */}
        <div className="flex items-center justify-between mt-2 text-xs text-gray-500">
          <div className="flex items-center gap-4">
            <span><i className="fa-solid fa-shield-alt mr-1 text-green-600"></i>Evidence-backed responses</span>
            <span><i className="fa-solid fa-link mr-1 text-blue-600"></i>Verifiable sources</span>
          </div>
          <Link to="/debate" className="text-blue-600 hover:underline font-medium flex items-center gap-1">
            <i className="fa-solid fa-comments"></i>
            Start Debate With Personas →
          </Link>
        </div>
      </div>
    </div>
  )
}

export default ChatInput

