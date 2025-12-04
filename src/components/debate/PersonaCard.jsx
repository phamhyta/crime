function PersonaCard({ persona }) {
  const renderStars = (count) => {
    return Array(5).fill(0).map((_, i) => (
      <i key={i} className={`fa-${i < count ? 'solid' : 'regular'} fa-star ${i < count ? 'text-yellow-500' : 'text-gray-300'}`}></i>
    ))
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active': return 'bg-green-500 animate-pulse'
      case 'replying': return 'bg-yellow-500 animate-pulse'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className={`bg-gradient-to-br ${persona.gradient} rounded-lg p-4 border-l-4 ${persona.border} hover:shadow-lg transition cursor-pointer`}>
      <div className="flex items-start gap-3 mb-3">
        <img src={persona.avatar} className="w-12 h-12 rounded-full object-cover" alt={persona.name} />
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900">{persona.name}</h4>
          <span className={`inline-block px-2 py-1 text-xs ${persona.stanceColor} text-white rounded mt-1`}>
            {persona.stance}
          </span>
        </div>
        <div className={`w-2 h-2 rounded-full ${getStatusColor(persona.status)}`} title={persona.status}></div>
      </div>
      <p className="text-sm text-gray-700 mb-3">{persona.desc}</p>
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">{persona.focus}</span>
          <div className="flex gap-1">{renderStars(persona.stars)}</div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-600">Reliability</span>
          <span className={`font-semibold ${persona.reliabilityColor}`}>{persona.reliability}/10</span>
        </div>
      </div>
    </div>
  )
}

export default PersonaCard

