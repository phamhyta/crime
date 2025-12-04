import { useEffect, useRef } from 'react'
import Plotly from 'plotly.js-dist-min'

function ChartSection({ title, children, charts }) {
  const chartRefs = useRef([])

  useEffect(() => {
    charts?.forEach((chart, idx) => {
      if (chartRefs.current[idx]) {
        Plotly.newPlot(chartRefs.current[idx], chart.data, chart.layout, { responsive: true, displayModeBar: false })
      }
    })

    return () => {
      chartRefs.current.forEach(ref => {
        if (ref) Plotly.purge(ref)
      })
    }
  }, [charts])

  return (
    <div className="mb-8">
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 className="text-xl font-semibold text-gray-900 mb-6">{title}</h3>
        {children}
        {charts && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {charts.map((chart, idx) => (
              <div key={idx} className={chart.colSpan ? `lg:col-span-${chart.colSpan}` : ''}>
                {chart.subtitle && <h4 className="text-lg font-medium text-gray-800 mb-4">{chart.subtitle}</h4>}
                <div ref={el => chartRefs.current[idx] = el} style={{ height: chart.height || '300px' }}></div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default ChartSection

