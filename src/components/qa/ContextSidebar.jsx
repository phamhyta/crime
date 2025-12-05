import SourceExplorer from './SourceExplorer'
import EvidenceHighlights from './EvidenceHighlights'
import ConversationHistory from './ConversationHistory'

function ContextSidebar({ sources, highlights, conversations, onSelectConversation, onClearHistory }) {
  return (
    <aside className="w-[30%] bg-white border-r border-gray-200 p-4 h-[calc(100vh-73px)] sticky top-[73px] overflow-y-auto">
      <ConversationHistory 
        conversations={conversations}
        onSelectConversation={onSelectConversation}
        onClearHistory={onClearHistory}
      />

      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="fa-solid fa-database mr-2 text-blue-600"></i>
          Context Panel
        </h3>

        <SourceExplorer sources={sources} />
        <EvidenceHighlights highlights={highlights} />

        {/* Filters */}
        <div>
          <h4 className="text-sm font-semibold text-gray-700 mb-3">Filters</h4>
          <div className="space-y-3">
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Time Range</label>
              <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white">
                <option>30 days</option>
                <option>90 days</option>
                <option>All time</option>
              </select>
            </div>
            <div>
              <label className="text-xs font-medium text-gray-600 mb-1 block">Evidence Type</label>
              <select className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white">
                <option>All types</option>
                <option>Legal</option>
                <option>News</option>
                <option>Reddit</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default ContextSidebar

