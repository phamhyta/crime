function DebateBubble({ avatar, name, time, content, actions, tags, bgColor, borderColor }) {
  return (
    <div className="flex gap-4">
      <img src={avatar} className="w-10 h-10 rounded-full object-cover" alt={name} />
      <div className="flex-1">
        <div className={`${bgColor} rounded-lg p-4 border-l-4 ${borderColor}`}>
          <div className="flex items-center justify-between mb-2">
            <h4 className="font-semibold text-gray-900">{name}</h4>
            <span className="text-xs text-gray-500">{time}</span>
          </div>
          <p className="text-gray-800 leading-relaxed" dangerouslySetInnerHTML={{ __html: content }}></p>
          {actions && (
            <div className="flex gap-2 mt-3 flex-wrap">
              {actions.map((action, idx) => (
                <button
                  key={idx}
                  className={`px-3 py-1 ${action.bg} ${action.hoverBg} ${action.textColor} rounded text-xs font-medium transition`}
                >
                  <i className={`fa-solid ${action.icon} mr-1`}></i>{action.label}
                </button>
              ))}
            </div>
          )}
          {tags && (
            <div className="mt-2 flex items-center gap-2">
              {tags.map((tag, idx) => (
                <span key={idx} className={`px-2 py-1 ${tag.bg} ${tag.textColor} text-xs rounded`}>
                  {tag.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DebateBubble

