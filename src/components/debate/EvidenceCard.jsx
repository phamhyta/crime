function EvidenceCard({ evidence }) {
  const colorClasses = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', badge: 'bg-blue-600', link: 'text-blue-600 hover:text-blue-800' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', badge: 'bg-purple-600', link: 'text-purple-600 hover:text-purple-800' },
    red: { bg: 'bg-red-50', border: 'border-red-200', badge: 'bg-red-600', link: 'text-red-600 hover:text-red-800' }
  }

  const colors = colorClasses[evidence.color] || colorClasses.blue

  return (
    <div className={`${colors.bg} rounded-lg p-4 border ${colors.border}`}>
      <div className="flex items-start justify-between mb-2">
        <span className={`px-2 py-1 ${colors.badge} text-white text-xs rounded font-medium`}>
          {evidence.id}
        </span>
        <span className={`px-2 py-1 ${evidence.scoreColor || 'bg-green-100 text-green-800'} text-xs rounded`}>
          {evidence.score}/10
        </span>
      </div>
      <h4 className="font-semibold text-gray-900 mb-2">{evidence.title}</h4>
      <p className="text-sm text-gray-700 mb-3">{evidence.text}</p>
      <div className="flex items-center gap-2 text-xs text-gray-600 mb-3">
        <span className="px-2 py-1 bg-gray-100 rounded">{evidence.type}</span>
        <span>•</span>
        <span>Used by {evidence.usedBy} persona{evidence.usedBy > 1 ? 's' : ''}</span>
      </div>
      <a href="#" className={`text-xs ${colors.link} flex items-center`}>
        <i className="fa-solid fa-external-link mr-1"></i>{evidence.link}
      </a>
    </div>
  )
}

export default EvidenceCard

