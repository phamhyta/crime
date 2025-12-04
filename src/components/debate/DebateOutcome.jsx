import { Link } from 'react-router-dom'

function DebateOutcome({ rankings }) {
  const counterfactuals = [
    { title: 'What if age raised to 16?', desc: 'Explore implications of higher threshold' },
    { title: 'Rehabilitation programs +40%', desc: 'Impact of increased intervention funding' },
    { title: 'Abolish mandatory detention', desc: 'Alternative sentencing approaches' }
  ]

  return (
    <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-8">
      <div className="text-center mb-8">
        <div className="inline-block px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm font-medium mb-4">
          <i className="fa-solid fa-flag-checkered mr-2"></i>Debate Completed
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Debate Outcome & Consensus Summary</h2>
        <p className="text-gray-600">Analysis of multi-persona debate on criminal responsibility age</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Final Summary</h3>
          <div className="space-y-4 text-gray-700">
            <p className="leading-relaxed">
              The debate revealed strong evidence-based support for raising the criminal responsibility age to 14, grounded in developmental neuroscience and international human rights standards.
            </p>
            <p className="leading-relaxed">
              <strong>Points of Consensus:</strong> All personas acknowledged the importance of protecting children's rights and the need for age-appropriate interventions.
            </p>
            <p className="leading-relaxed">
              <strong>Points of Contention:</strong> Disagreement centered on balancing public safety concerns with rehabilitation goals.
            </p>
            <p className="leading-relaxed">
              <strong>Evidence-Based Conclusion:</strong> The weight of scientific evidence and international precedent supports raising the age to 14, with appropriate safeguards.
            </p>
          </div>
        </div>

        <div>
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Persona Performance Ranking</h3>
          <div className="space-y-3">
            {rankings.map((r, idx) => (
              <div key={idx} className={`flex items-center gap-3 p-3 bg-gradient-to-r ${r.bg} rounded-lg border ${r.border}`}>
                <div className={`w-8 h-8 ${r.rankBg} rounded-full flex items-center justify-center text-white font-bold text-sm`}>
                  {r.rank}
                </div>
                <img
                  src={`https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/${r.avatar}`}
                  className="w-10 h-10 rounded-full object-cover"
                  alt={r.name}
                />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">{r.name}</p>
                  <div className="flex gap-2 text-xs">
                    <span className="text-green-600">Evidence: {r.evidence}</span>
                    <span className="text-blue-600">Consistency: {r.consistency}</span>
                    <span className="text-purple-600">Fairness: {r.fairness}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Counterfactual */}
      <div className="bg-gradient-to-r from-teal-50 to-blue-50 rounded-xl p-6 mb-8 border border-teal-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
          <i className="fa-solid fa-flask mr-2 text-teal-600"></i>Counterfactual Exploration
        </h3>
        <p className="text-gray-700 mb-4">Explore alternative scenarios and their potential impacts:</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {counterfactuals.map((scenario, idx) => (
            <div key={idx} className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition cursor-pointer">
              <h4 className="font-semibold text-gray-900 mb-2">{scenario.title}</h4>
              <p className="text-sm text-gray-600 mb-3">{scenario.desc}</p>
              <button className="w-full px-3 py-2 bg-teal-100 hover:bg-teal-200 text-teal-700 rounded text-sm font-medium transition">
                Generate Scenario
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition">
          <i className="fa-solid fa-file-pdf mr-2"></i>Export as PDF
        </button>
        <button className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg font-medium transition">
          <i className="fa-solid fa-quote-right mr-2"></i>Export Citations
        </button>
        <Link to="/qa" className="px-6 py-3 bg-purple-100 hover:bg-purple-200 text-purple-700 rounded-lg font-medium transition">
          <i className="fa-solid fa-question-circle mr-2"></i>View in QA
        </Link>
        <button className="px-6 py-3 bg-green-100 hover:bg-green-200 text-green-700 rounded-lg font-medium transition">
          <i className="fa-solid fa-plus mr-2"></i>Start New Debate
        </button>
      </div>
    </div>
  )
}

export default DebateOutcome

