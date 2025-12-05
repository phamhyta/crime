import EvidenceCard from './EvidenceCard'

function EvidencePanel({ evidences, claimEvidenceRef, onEvidenceClick }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 sticky top-24">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <i className="fa-solid fa-file-shield mr-2 text-blue-600"></i>Evidence Viewer
      </h3>
      <div className="space-y-4">
        {evidences.map((ev, idx) => (
          <EvidenceCard key={idx} evidence={ev} onClick={onEvidenceClick} />
        ))}
      </div>

      <div className="mt-6">
        <h4 className="text-sm font-semibold text-gray-700 mb-3">Claim-Evidence Graph</h4>
        <div ref={claimEvidenceRef} style={{ height: '250px' }}></div>
      </div>

      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start gap-2">
          <i className="fa-solid fa-lightbulb text-yellow-600 mt-1"></i>
          <div>
            <p className="text-sm font-medium text-gray-900">Transparency Note</p>
            <p className="text-xs text-gray-600 mt-1">
              All evidence is verified against source documents. Reliability scores based on source credibility, citation context, and cross-reference validation.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EvidencePanel

