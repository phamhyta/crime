function SourceExplorer({ sources }) {
  return (
    <div className="mb-6">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">Source Explorer</h4>
      <div className="space-y-2">
        {sources.map((source, idx) => (
          <div key={idx} className={`p-3 ${source.bg} rounded-lg cursor-pointer ${source.hover} transition`}>
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-900">
                <i className={`${source.icon} ${source.iconColor} mr-2`}></i>{source.name}
              </span>
              <span className={`text-xs ${source.scoreBg} px-2 py-1 rounded`}>Score {source.score}</span>
            </div>
            <p className="text-xs text-gray-600 mt-1">{source.matches} matches</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default SourceExplorer

