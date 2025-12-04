function EvidenceHighlights({ highlights }) {
  return (
    <div className="mb-6">
      <h4 className="text-sm font-semibold text-gray-700 mb-3">Top Evidence Highlights</h4>
      <div className="space-y-3">
        {highlights.map((item, idx) => (
          <div key={idx} className={`p-3 bg-gray-50 rounded-lg border-l-4 ${item.color}`}>
            <p className="text-xs text-gray-800 mb-2">{item.text}</p>
            <div className="flex items-center justify-between">
              <a href="#" className="text-xs text-blue-600 hover:underline">{item.source}</a>
              <span className={`text-xs ${item.scoreBg} px-2 py-1 rounded`}>{item.score}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default EvidenceHighlights

