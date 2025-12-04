import { useEffect, useRef } from 'react'
import Plotly from 'plotly.js-dist-min'

function KPICard({ title, value, icon, iconBg, iconColor, sparklineData, sparklineColor, change, changeType, customContent }) {
  const sparklineRef = useRef(null)

  useEffect(() => {
    if (sparklineRef.current && sparklineData) {
      Plotly.newPlot(sparklineRef.current, [{
        x: [1, 2, 3, 4, 5, 6, 7],
        y: sparklineData,
        type: 'scatter',
        mode: 'lines',
        line: { color: sparklineColor, width: 2 },
        showlegend: false
      }], {
        margin: { t: 0, r: 0, b: 0, l: 0 },
        xaxis: { visible: false },
        yaxis: { visible: false },
        plot_bgcolor: 'rgba(0,0,0,0)',
        paper_bgcolor: 'rgba(0,0,0,0)'
      }, { responsive: true, displayModeBar: false })
    }

    return () => {
      if (sparklineRef.current) {
        Plotly.purge(sparklineRef.current)
      }
    }
  }, [sparklineData, sparklineColor])

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
        <div className={`w-12 h-12 ${iconBg} rounded-lg flex items-center justify-center`}>
          <i className={`fa-solid ${icon} ${iconColor}`}></i>
        </div>
      </div>
      {sparklineData && <div ref={sparklineRef} style={{ height: '40px' }}></div>}
      {customContent}
      {change && (
        <p className={`text-xs ${changeType === 'positive' ? 'text-green-600' : 'text-red-600'} mt-2`}>
          <i className={`fa-solid fa-arrow-${changeType === 'positive' ? 'up' : 'down'} mr-1`}></i>
          {change}
        </p>
      )}
    </div>
  )
}

export default KPICard

