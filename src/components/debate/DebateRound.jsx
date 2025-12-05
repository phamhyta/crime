import DebateBubble from './DebateBubble'

function DebateRound({ round, isActive, onToggle, children, heatmapRef }) {
  return (
    <div className="bg-white rounded-md shadow-sm border border-gray-200 overflow-hidden">
      <div
        className={`bg-gradient-to-r ${round.gradient} p-3 flex items-center justify-between cursor-pointer`}
        onClick={onToggle}
      >
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 ${round.bg} rounded-lg flex items-center justify-center text-white font-bold`}>
            {round.num}
          </div>
          <h3 className="text-lg font-semibold text-gray-900">Round {round.num} — {round.title}</h3>
        </div>
        <i className={`fa-solid fa-chevron-${isActive ? 'up' : 'down'} text-gray-600`}></i>
      </div>
      {isActive && (
        <div>
          {round.status === 'locked' ? (
            <div className="p-4">
              <div className="text-center py-8 text-gray-400">
                <i className="fa-solid fa-lock text-4xl mb-3"></i>
                <p>Locked until Round {round.num - 1} completes</p>
              </div>
            </div>
          ) : round.status === 'in-progress' ? (
            <div className="p-4">
              <div className="text-center py-8 text-gray-500">
                <i className="fa-solid fa-clock text-4xl mb-3"></i>
                <p>Round in progress...</p>
              </div>
            </div>
          ) : (
            <>
              <div className="p-4 space-y-4">
                {children}
              </div>
              {heatmapRef && (
                <div className="bg-gray-50 p-4 border-t border-gray-200">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">Round {round.num} Agreement Heatmap</h4>
                  <div ref={heatmapRef} style={{ height: '200px' }}></div>
                </div>
              )}
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default DebateRound

