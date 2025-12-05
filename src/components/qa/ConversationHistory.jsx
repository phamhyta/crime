import { useState } from 'react'

function ConversationHistory({ conversations = [], onSelectConversation, onClearHistory }) {
  const [showLoadMore, setShowLoadMore] = useState(true)

  const defaultConversations = [
    {
      id: 1,
      question: "What are the key arguments surrounding raising the age of criminal responsibility?",
      timeAgo: "2h ago",
      sourcesCount: 5,
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      borderColor: "border-blue-500"
    },
    {
      id: 2,
      question: "How do international standards compare to Queensland's youth justice?",
      timeAgo: "5h ago",
      sourcesCount: 8,
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100",
      borderColor: "border-green-500"
    },
    {
      id: 3,
      question: "What evidence exists for rehabilitation programs effectiveness?",
      timeAgo: "1d ago",
      sourcesCount: 12,
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100",
      borderColor: "border-purple-500"
    }
  ]

  const displayConversations = conversations.length > 0 ? conversations : defaultConversations

  const handleClick = (conversation) => {
    if (onSelectConversation) {
      onSelectConversation(conversation)
    }
  }

  const handleClear = (e) => {
    e.stopPropagation()
    if (onClearHistory) {
      onClearHistory()
    }
  }

  return (
    <div className="mb-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900 flex items-center">
          <i className="fa-solid fa-history mr-2 text-blue-600"></i>
          Conversation History
        </h3>
        <button 
          onClick={handleClear}
          className="text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1"
        >
          <i className="fa-solid fa-trash"></i>
          Clear
        </button>
      </div>
      
      <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
        {displayConversations.map((conversation) => (
          <div
            key={conversation.id}
            onClick={() => handleClick(conversation)}
            className={`p-3 ${conversation.bgColor || 'bg-gray-50'} rounded-lg ${conversation.hoverColor || 'hover:bg-gray-100'} transition cursor-pointer border-l-4 ${conversation.borderColor || 'border-gray-500'}`}
          >
            <p className="text-sm font-medium text-gray-900 mb-1 line-clamp-2">
              {conversation.question}
            </p>
            <div className="flex items-center gap-3 text-xs text-gray-500">
              <span>
                <i className="fa-solid fa-clock mr-1"></i>
                {conversation.timeAgo || conversation.timestamp}
              </span>
              <span>
                <i className="fa-solid fa-bookmark mr-1"></i>
                {conversation.sourcesCount || conversation.sources || 0} sources
              </span>
            </div>
          </div>
        ))}
      </div>
      
      {showLoadMore && (
        <button 
          onClick={() => setShowLoadMore(false)}
          className="w-full text-sm text-blue-600 hover:text-blue-800 font-medium flex items-center justify-center gap-2"
        >
          <i className="fa-solid fa-chevron-down"></i>
          Load more
        </button>
      )}
    </div>
  )
}

export default ConversationHistory

