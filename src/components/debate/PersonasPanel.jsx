import PersonaCard from './PersonaCard'

function PersonasPanel({ personas }) {
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 p-4 sticky top-24">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <i className="fa-solid fa-users mr-2 text-blue-600"></i>Debate Personas
      </h3>
      <div className="space-y-4">
        {personas.map((persona, idx) => (
          <PersonaCard key={idx} persona={persona} />
        ))}
      </div>
      <button className="w-full mt-4 px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg text-sm font-medium transition">
        <i className="fa-solid fa-plus mr-2"></i>Add Custom Persona
      </button>
    </div>
  )
}

export default PersonasPanel

