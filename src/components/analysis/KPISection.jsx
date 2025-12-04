import KPICard from './KPICard'

function KPISection() {
  const kpis = [
    {
      title: 'Total Posts',
      value: '2,847',
      icon: 'fa-file-lines',
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      sparklineData: [2400, 2500, 2300, 2600, 2700, 2800, 2847],
      sparklineColor: '#3b82f6',
      change: '+12.5% from last week',
      changeType: 'positive'
    },
    {
      title: 'Total Comments',
      value: '18,592',
      icon: 'fa-comments',
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      sparklineData: [16200, 16800, 15900, 17100, 17600, 18100, 18592],
      sparklineColor: '#10b981',
      change: '+8.3% from last week',
      changeType: 'positive'
    },
    {
      title: 'Unique Authors',
      value: '1,284',
      icon: 'fa-users',
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      sparklineData: [1320, 1310, 1295, 1300, 1290, 1285, 1284],
      sparklineColor: '#a855f7',
      change: '-2.1% from last week',
      changeType: 'negative'
    },
    {
      title: 'Evidence-backed',
      value: '34.2%',
      icon: 'fa-shield',
      iconBg: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      sparklineData: [28.3, 29.1, 30.2, 31.5, 32.8, 33.4, 34.2],
      sparklineColor: '#6366f1',
      change: '+5.8% from last week',
      changeType: 'positive'
    },
    {
      title: 'Toxicity Index',
      value: '6.7',
      icon: 'fa-exclamation-triangle',
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      sparklineData: [5.8, 6.1, 6.3, 6.5, 6.4, 6.6, 6.7],
      sparklineColor: '#f59e0b',
      change: '+3.2% from last week',
      changeType: 'negative'
    },
    {
      title: 'Sentiment',
      value: '-0.34',
      icon: 'fa-chart-line',
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      customContent: (
        <div className="flex text-xs mt-2 flex-wrap">
          <span className="text-red-600">45% Neg</span>
          <span className="text-gray-500 mx-1">•</span>
          <span className="text-gray-600">32% Neu</span>
          <span className="text-gray-500 mx-1">•</span>
          <span className="text-green-600">23% Pos</span>
        </div>
      )
    }
  ]

  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6">
        {kpis.map((kpi, idx) => (
          <KPICard key={idx} {...kpi} />
        ))}
      </div>
    </div>
  )
}

export default KPISection

