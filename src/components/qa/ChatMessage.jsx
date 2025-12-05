function ChatMessage({ type, content, children }) {
  if (type === 'user') {
    return (
      <div className="flex justify-end">
        <div className="bg-blue-600 text-white p-4 rounded-md rounded-br-none max-w-2xl shadow-md">
          <p className="font-semibold mb-1 text-sm">You asked:</p>
          <p>{content}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-start items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0 border-2 border-white shadow">
        <i className="fa-solid fa-robot text-gray-600"></i>
      </div>
      <div className="bg-white p-4 rounded-md rounded-bl-none shadow-sm border border-gray-200 max-w-4xl">
        {children}
      </div>
    </div>
  )
}

export default ChatMessage

