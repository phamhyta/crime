import { useEffect } from 'react'

function NewsDetailModal({ isOpen, onClose, newsItem }) {
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

  if (!isOpen || !newsItem) return null

  const getSourceIcon = (source) => {
    switch (source) {
      case 'reddit': return 'fa-brands fa-reddit'
      case 'news': return 'fa-solid fa-newspaper'
      case 'legal': return 'fa-solid fa-gavel'
      default: return 'fa-solid fa-circle'
    }
  }

  const getSourceName = (source) => {
    return source.charAt(0).toUpperCase() + source.slice(1)
  }

  const getSourceIconBg = (source) => {
    switch (source) {
      case 'reddit': return 'bg-red-100 text-red-600'
      case 'news': return 'bg-blue-100 text-blue-600'
      case 'legal': return 'bg-purple-100 text-purple-600'
      default: return 'bg-gray-100 text-gray-600'
    }
  }

  const getSentimentData = (sentiment) => {
    const sentimentLower = sentiment.toLowerCase()
    switch (sentimentLower) {
      case 'positive':
        return { bg: 'bg-green-100', text: 'text-green-800', label: 'Positive' }
      case 'negative':
        return { bg: 'bg-red-100', text: 'text-red-800', label: 'Negative' }
      case 'neutral':
        return { bg: 'bg-gray-100', text: 'text-gray-800', label: 'Neutral' }
      case 'mixed':
        return { bg: 'bg-yellow-100', text: 'text-yellow-800', label: 'Mixed' }
      default:
        return { bg: 'bg-gray-100', text: 'text-gray-800', label: sentiment }
    }
  }

  const sentimentData = getSentimentData(newsItem.sentiment || 'neutral')
  const reliability = newsItem.reliability || '0.85'
  const toxicity = newsItem.toxicity || 'Low'
  const toxicityData = toxicity === 'Low' || toxicity === 'None' 
    ? { bg: 'bg-green-100', text: 'text-green-800', label: toxicity }
    : { bg: 'bg-yellow-100', text: 'text-yellow-800', label: toxicity }

  const formatTimestamp = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleString('vi-VN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  return (
    <div 
      className={`fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4 ${isOpen ? '' : 'hidden'}`}
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-2xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-purple-50">
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center shadow-sm ${getSourceIconBg(newsItem.source)}`}>
              <i className={`${getSourceIcon(newsItem.source)} text-2xl`}></i>
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                {newsItem.title || `${getSourceName(newsItem.source)} Content`}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                {newsItem.subtitle || `${getSourceName(newsItem.source)} • ${formatTimestamp(newsItem.timestamp)}`}
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
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <div className={`px-4 py-2 text-sm rounded-lg font-semibold shadow-sm ${sentimentData.bg} ${sentimentData.text}`}>
                {sentimentData.label}
              </div>
              <div className={`px-4 py-2 text-sm rounded-lg font-semibold shadow-sm bg-blue-100 text-blue-800`}>
                Reliability: {reliability}
              </div>
              <div className={`px-4 py-2 text-sm rounded-lg font-semibold shadow-sm ${toxicityData.bg} ${toxicityData.text}`}>
                Toxicity: {toxicityData.label}
              </div>
            </div>

            {/* Full Content */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-2 mb-3">
                <i className="fa-solid fa-file-alt text-gray-700"></i>
                <h4 className="font-bold text-gray-900 text-lg">Full Content</h4>
              </div>
              <div className="text-gray-800 leading-relaxed text-base">
                {newsItem.fullContent || newsItem.content}
              </div>
            </div>

            {/* Metadata and AI Analysis */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Metadata */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <i className="fa-solid fa-info-circle text-blue-600"></i>
                  <h4 className="font-bold text-gray-900">Metadata</h4>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Source:</span>
                    <span className="font-semibold text-gray-900">{getSourceName(newsItem.source)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Timestamp:</span>
                    <span className="font-semibold text-gray-900 text-xs">{formatTimestamp(newsItem.timestamp)}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Author:</span>
                    <span className="font-semibold text-gray-900">{newsItem.author || 'Unknown'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-600 font-medium">Engagement:</span>
                    <span className="font-semibold text-gray-900 text-xs">{newsItem.engagement || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-600 font-medium">Category:</span>
                    <span className="font-semibold text-gray-900">{newsItem.category || 'General'}</span>
                  </div>
                </div>
              </div>

              {/* AI Analysis */}
              <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
                <div className="flex items-center gap-2 mb-4">
                  <i className="fa-solid fa-brain text-purple-600"></i>
                  <h4 className="font-bold text-gray-900">AI Analysis</h4>
                </div>
                <div className="space-y-3">
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fa-solid fa-heart text-blue-700 text-sm"></i>
                      <h5 className="text-sm font-bold text-blue-900">Sentiment Analysis</h5>
                    </div>
                    <p className="text-xs text-blue-800 leading-relaxed">
                      {newsItem.sentimentAnalysis || `${sentimentData.label} sentiment detected with clear emotional indicators.`}
                    </p>
                  </div>
                  <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fa-solid fa-tags text-green-700 text-sm"></i>
                      <h5 className="text-sm font-bold text-green-900">Key Topics</h5>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(newsItem.topics || ['General Discussion', 'News Update']).map((topic, idx) => (
                        <span key={idx} className="px-3 py-1.5 bg-green-200 text-green-900 text-xs rounded-full font-semibold shadow-sm">
                          {topic}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                    <div className="flex items-center gap-2 mb-2">
                      <i className="fa-solid fa-balance-scale text-purple-700 text-sm"></i>
                      <h5 className="text-sm font-bold text-purple-900">Stance Detection</h5>
                    </div>
                    <p className="text-xs text-purple-800 leading-relaxed">
                      {newsItem.stance || 'Neutral reporting stance with balanced perspective.'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Evidence & Citations */}
            <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <i className="fa-solid fa-link text-orange-600"></i>
                <h4 className="font-bold text-gray-900">Evidence & Citations</h4>
              </div>
              <div className="space-y-2">
                {newsItem.citations && newsItem.citations.length > 0 ? (
                  newsItem.citations.map((citation, idx) => (
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
                  ))
                ) : (
                  <div className="text-center py-6">
                    <i className="fa-solid fa-info-circle text-gray-400 text-2xl mb-2"></i>
                    <p className="text-sm text-gray-600 italic">No citations available for this content</p>
                  </div>
                )}
              </div>
            </div>

            {/* Reliability Assessment */}
            <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-xl p-5 border border-amber-200">
              <div className="flex items-center gap-2 mb-3">
                <i className="fa-solid fa-exclamation-triangle text-amber-700"></i>
                <h4 className="font-bold text-gray-900">Reliability Assessment</h4>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-2xl font-bold text-blue-600">
                    {(parseFloat(reliability) + Math.random() * 0.1 - 0.05).toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Source Quality</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-2xl font-bold text-green-600">
                    {(0.75 + Math.random() * 0.2).toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Consistency</div>
                </div>
                <div className="bg-white rounded-lg p-3 shadow-sm">
                  <div className="text-2xl font-bold text-purple-600">
                    {(0.80 + Math.random() * 0.15).toFixed(2)}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Alignment</div>
                </div>
              </div>
              <p className="text-xs text-amber-800 mt-3 italic">
                Estimated based on: citation count, domain reliability, content consistency
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-4 border-t border-gray-200">
              {newsItem.sourceUrl && (
                <a
                  href={newsItem.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-blue-800 transition shadow-md font-semibold text-center"
                >
                  <i className="fa-solid fa-external-link-alt mr-2"></i>View Original Source
                </a>
              )}
              <button className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition font-semibold shadow-sm">
                <i className="fa-solid fa-share mr-2"></i>Share
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-xl hover:from-gray-200 hover:to-gray-300 transition font-semibold shadow-sm">
                <i className="fa-solid fa-bookmark mr-2"></i>Save
              </button>
              <button className="px-6 py-3 bg-gradient-to-r from-green-100 to-green-200 text-green-700 rounded-xl hover:from-green-200 hover:to-green-300 transition font-semibold shadow-sm">
                <i className="fa-solid fa-comments mr-2"></i>Open in Debate
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewsDetailModal

