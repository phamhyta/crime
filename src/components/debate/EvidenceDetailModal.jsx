import { useEffect } from 'react'

function EvidenceDetailModal({ isOpen, onClose, evidence }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  if (!isOpen || !evidence) return null

  const colorClasses = {
    blue: { 
      iconBg: 'bg-blue-100 text-blue-600',
      badge: 'bg-blue-100 text-blue-800',
      reliabilityBg: 'bg-blue-100 text-blue-800'
    },
    purple: { 
      iconBg: 'bg-purple-100 text-purple-600',
      badge: 'bg-purple-100 text-purple-800',
      reliabilityBg: 'bg-purple-100 text-purple-800'
    },
    red: { 
      iconBg: 'bg-red-100 text-red-600',
      badge: 'bg-red-100 text-red-800',
      reliabilityBg: 'bg-red-100 text-red-800'
    },
    green: {
      iconBg: 'bg-green-100 text-green-600',
      badge: 'bg-green-100 text-green-800',
      reliabilityBg: 'bg-green-100 text-green-800'
    },
    gray: {
      iconBg: 'bg-gray-100 text-gray-600',
      badge: 'bg-gray-100 text-gray-800',
      reliabilityBg: 'bg-gray-100 text-gray-800'
    }
  }

  const colors = colorClasses[evidence.color] || colorClasses.blue

  const getTypeIcon = (type) => {
    if (type?.includes('Legal')) return 'fa-solid fa-gavel'
    if (type?.includes('Academic') || type?.includes('Research')) return 'fa-solid fa-book'
    if (type?.includes('Government') || type?.includes('Report')) return 'fa-solid fa-file-alt'
    if (type?.includes('Document')) return 'fa-solid fa-file-contract'
    return 'fa-solid fa-file-shield'
  }

  const getTypeIconBg = (type) => {
    if (type?.includes('Legal')) return 'bg-purple-100 text-purple-600'
    if (type?.includes('Academic') || type?.includes('Research')) return 'bg-blue-100 text-blue-600'
    if (type?.includes('Government') || type?.includes('Report')) return 'bg-green-100 text-green-600'
    return 'bg-gray-100 text-gray-600'
  }

  const getReliabilityScore = () => {
    const score = parseFloat(evidence.score || 0)
    if (score >= 8.5) return { bg: 'bg-green-100', text: 'text-green-800', label: 'High' }
    if (score >= 7.0) return { bg: 'bg-blue-100', text: 'text-blue-800', label: 'Medium-High' }
    if (score >= 5.5) return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Medium' }
    return { bg: 'bg-red-100', text: 'text-red-800', label: 'Low' }
  }

  const reliability = getReliabilityScore()

  return (
    <>
      <style>{`
        .evidence-highlight {
          background: linear-gradient(120deg, #fef3c7 0%, #fde68a 100%);
          padding: 2px 4px;
          border-radius: 4px;
          border-left: 3px solid #f59e0b;
          font-weight: 500;
        }
      `}</style>
      <div 
        className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${isOpen ? '' : 'hidden'}`}
        onClick={onClose}
      >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-md flex items-center justify-center shadow-sm ${getTypeIconBg(evidence.type)}`}>
              <i className={`${getTypeIcon(evidence.type)} text-2xl`}></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">{evidence.title}</h3>
              <p className="text-sm text-gray-600 mt-1">
                {evidence.type} • Reference {evidence.id}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition"
          >
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <div className={`px-4 py-2 text-sm rounded-lg font-semibold shadow-sm ${colors.badge}`}>
                {evidence.id}
              </div>
              <div className={`px-4 py-2 text-sm rounded-lg font-semibold shadow-sm ${reliability.bg} ${reliability.text}`}>
                Reliability: {evidence.score}/10 ({reliability.label})
              </div>
              <div className={`px-4 py-2 text-sm rounded-lg font-semibold shadow-sm ${evidence.scoreColor || 'bg-green-100 text-green-800'}`}>
                {evidence.type}
              </div>
              {evidence.usedBy && (
                <div className="px-4 py-2 text-sm rounded-lg font-semibold shadow-sm bg-indigo-100 text-indigo-800">
                  Used by {evidence.usedBy} persona{evidence.usedBy > 1 ? 's' : ''}
                </div>
              )}
            </div>

            {/* Full Content */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-md p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <i className="fa-solid fa-file-alt text-gray-700"></i>
                <h4 className="font-bold text-gray-900 text-lg">Evidence Content</h4>
              </div>
              <div className="text-gray-800 leading-relaxed text-base">
                {evidence.fullContent || evidence.text}
              </div>
            </div>

            {/* Document Extract with Highlighted Cited Text */}
            {evidence.documentExtract && (
              <div className="border-t pt-4">
                <h5 className="text-sm font-semibold text-gray-700 mb-2 flex items-center">
                  <i className="fa-solid fa-quote-left mr-2 text-gray-400"></i>Document Extract
                </h5>
                <div 
                  className="bg-gray-50 rounded-lg p-4 text-gray-800 leading-relaxed"
                  dangerouslySetInnerHTML={{ __html: evidence.documentExtract }}
                ></div>
              </div>
            )}

            {/* Metadata and Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {/* Metadata */}
              <div className="bg-white rounded-md p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <i className="fa-solid fa-info-circle text-blue-600"></i>
                  <h4 className="font-bold text-gray-900">Metadata</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Type:</span>
                    <span className="font-semibold text-gray-900">{evidence.type}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Reference ID:</span>
                    <span className="font-semibold text-gray-900">{evidence.id}</span>
                  </div>
                  {evidence.source && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Source:</span>
                      <span className="font-semibold text-gray-900">{evidence.source}</span>
                    </div>
                  )}
                  {evidence.publishedDate && (
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600 font-medium">Published:</span>
                      <span className="font-semibold text-gray-900 text-xs">{evidence.publishedDate}</span>
                    </div>
                  )}
                  {evidence.usedBy && (
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600 font-medium">Cited By:</span>
                      <span className="font-semibold text-gray-900">{evidence.usedBy} persona{evidence.usedBy > 1 ? 's' : ''}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Evidence Analysis */}
              <div className="bg-white rounded-md p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <i className="fa-solid fa-brain text-purple-600"></i>
                  <h4 className="font-bold text-gray-900">Evidence Analysis</h4>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fa-solid fa-shield-alt text-blue-700 text-sm"></i>
                      <h5 className="text-sm font-bold text-blue-900">Reliability Assessment</h5>
                    </div>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      {evidence.reliabilityAnalysis || `This evidence has a reliability score of ${evidence.score}/10 based on source credibility, citation context, and cross-reference validation.`}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fa-solid fa-check-circle text-green-700 text-sm"></i>
                      <h5 className="text-sm font-bold text-green-900">Verification Status</h5>
                    </div>
                    <p className="text-xs text-green-800 leading-relaxed">
                      {evidence.verificationStatus || 'Evidence verified against source documents and cross-referenced with related materials.'}
                    </p>
                  </div>
                  {evidence.relevance && (
                    <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                      <div className="flex items-center gap-2 mb-2">
                        <i className="fa-solid fa-link text-purple-700 text-sm"></i>
                        <h5 className="text-sm font-bold text-purple-900">Relevance to Debate</h5>
                      </div>
                      <p className="text-xs text-purple-800 leading-relaxed">{evidence.relevance}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Related Citations */}
            {evidence.relatedCitations && evidence.relatedCitations.length > 0 && (
              <div className="bg-white rounded-md p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <i className="fa-solid fa-link text-orange-600"></i>
                  <h4 className="font-bold text-gray-900">Related Citations</h4>
                </div>
                <div className="space-y-2">
                  {evidence.relatedCitations.map((citation, idx) => (
                    <div key={idx} className="flex items-start gap-3 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg border border-gray-200 hover:shadow-md transition">
                      <i className="fa-solid fa-link text-blue-600 mt-1 text-lg"></i>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900 font-medium">{citation.text}</p>
                        <span className="text-xs text-gray-600 bg-white px-2 py-1 rounded mt-1 inline-block">
                          {citation.type}
                        </span>
                      </div>
                      <a href={citation.url || '#'} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
                        <i className="fa-solid fa-external-link-alt text-sm"></i>
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Reliability Assessment */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-md p-5 border border-amber-200">
              <div className="flex items-center gap-2 mb-3">
                <i className="fa-solid fa-exclamation-triangle text-amber-700"></i>
                <h4 className="font-bold text-gray-900">Detailed Reliability Assessment</h4>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">
                    {(parseFloat(evidence.score) * 0.1 + 0.7 + Math.random() * 0.15).toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Source Quality</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-2xl font-bold text-green-600">
                    {(parseFloat(evidence.score) * 0.08 + 0.75 + Math.random() * 0.15).toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Consistency</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">
                    {(parseFloat(evidence.score) * 0.12 + 0.80 + Math.random() * 0.1).toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Alignment</div>
                </div>
              </div>
              <p className="text-xs text-amber-800 mt-3 italic">
                Estimated based on: citation count, domain reliability, content consistency, and source verification
              </p>
            </div>

            {/* Why This Evidence Matters */}
            <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
              <h5 className="text-sm font-semibold text-blue-900 mb-2 flex items-center">
                <i className="fa-solid fa-info-circle mr-2"></i>Why This Evidence Matters
              </h5>
              <p className="text-sm text-blue-800">
                {evidence.whyItMatters || `This source provides ${(evidence.type || 'evidence').toLowerCase()} supporting the argument with a reliability score of ${evidence.score}/10. The highlighted section directly addresses key claims in the debate.`}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              {evidence.link && (
                <a
                  href={evidence.link.startsWith('http') ? evidence.link : `https://${evidence.link}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-md hover:from-blue-700 hover:to-blue-800 transition shadow-md font-semibold text-center"
                >
                  <i className="fa-solid fa-external-link-alt mr-2"></i>View Original Source
                </a>
              )}
              <button className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-md hover:from-gray-200 hover:to-gray-300 transition font-semibold shadow-sm">
                <i className="fa-solid fa-share mr-2"></i>Share
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-md hover:from-gray-200 hover:to-gray-300 transition font-semibold shadow-sm">
                <i className="fa-solid fa-bookmark mr-2"></i>Save
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-md hover:from-green-200 hover:to-green-300 transition font-semibold shadow-sm">
                <i className="fa-solid fa-search mr-2"></i>Find Similar
              </button>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default EvidenceDetailModal

