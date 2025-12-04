import { useState, useEffect, useRef } from 'react'
import Plotly from 'plotly.js-dist-min'
import Header from '../components/Header'

function DataPage() {
  const [autoScroll, setAutoScroll] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [activeMetric, setActiveMetric] = useState('posts')
  const [metrics, setMetrics] = useState({
    postsPerMin: 12.5,
    commentsPerMin: 47.2,
    avgSentiment: -0.23,
    toxicityLevel: 6.8
  })
  const [feedItems, setFeedItems] = useState([
    {
      id: 1,
      source: 'reddit',
      time: '5s ago',
      content: 'New comment in r/australia: "These youth laws are completely broken..."',
      tags: [
        { label: 'Negative', bg: 'bg-red-100', text: 'text-red-800' },
        { label: 'Low Toxicity', bg: 'bg-green-100', text: 'text-green-800' }
      ],
      bgColor: 'bg-red-50',
      borderColor: 'border-red-500',
      iconColor: 'text-red-600'
    },
    {
      id: 2,
      source: 'news',
      time: '12s ago',
      content: 'ABC published article: "Queensland youth justice law update..."',
      tags: [
        { label: 'Reliability: 0.91', bg: 'bg-blue-100', text: 'text-blue-800' },
        { label: 'Neutral', bg: 'bg-gray-100', text: 'text-gray-800' }
      ],
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-500',
      iconColor: 'text-blue-600'
    },
    {
      id: 3,
      source: 'reddit',
      time: '18s ago',
      content: 'New post in r/melbourne: "Rehabilitation programs showing positive results..."',
      tags: [
        { label: 'Positive', bg: 'bg-green-100', text: 'text-green-800' },
        { label: 'Evidence-backed', bg: 'bg-blue-100', text: 'text-blue-800' }
      ],
      bgColor: 'bg-green-50',
      borderColor: 'border-green-500',
      iconColor: 'text-green-600'
    },
    {
      id: 4,
      source: 'legal',
      time: '25s ago',
      content: 'Court ruling published: "Youth detention facility standards..."',
      tags: [
        { label: 'High Authority', bg: 'bg-purple-100', text: 'text-purple-800' },
        { label: 'Neutral', bg: 'bg-gray-100', text: 'text-gray-800' }
      ],
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-500',
      iconColor: 'text-purple-600'
    },
    {
      id: 5,
      source: 'reddit',
      time: '32s ago',
      content: 'New comment thread: "Police response to youth crime incidents..."',
      tags: [
        { label: 'Mixed', bg: 'bg-yellow-100', text: 'text-yellow-800' },
        { label: 'High Toxicity', bg: 'bg-red-100', text: 'text-red-800' }
      ],
      bgColor: 'bg-yellow-50',
      borderColor: 'border-yellow-500',
      iconColor: 'text-yellow-600'
    },
    {
      id: 6,
      source: 'news',
      time: '45s ago',
      content: 'The Guardian: "Indigenous youth justice reform recommendations..."',
      tags: [
        { label: 'Reliability: 0.87', bg: 'bg-indigo-100', text: 'text-indigo-800' },
        { label: 'Positive', bg: 'bg-green-100', text: 'text-green-800' }
      ],
      bgColor: 'bg-indigo-50',
      borderColor: 'border-indigo-500',
      iconColor: 'text-indigo-600'
    },
    {
      id: 7,
      source: 'reddit',
      time: '1m ago',
      content: 'Discussion in r/legal: "Constitutional challenges to new legislation..."',
      tags: [
        { label: 'Neutral', bg: 'bg-gray-100', text: 'text-gray-800' },
        { label: 'Academic tone', bg: 'bg-blue-100', text: 'text-blue-800' }
      ],
      bgColor: 'bg-gray-50',
      borderColor: 'border-gray-500',
      iconColor: 'text-gray-600'
    }
  ])

  const realtimeChartRef = useRef(null)
  const sourceDistributionRef = useRef(null)
  const sentimentFlowRef = useRef(null)

  const timeDataRef = useRef([])
  const postsDataRef = useRef([])
  const commentsDataRef = useRef([])
  const sentimentDataRef = useRef([])
  const toxicityDataRef = useRef([])

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

  useEffect(() => {
    // Initialize data
    const timeData = []
    const postsData = []
    const commentsData = []
    const sentimentData = []
    const toxicityData = []

    for (let i = 0; i < 100; i++) {
      timeData.push(new Date(Date.now() - (100 - i) * 500).toLocaleTimeString())
      postsData.push(Math.floor(Math.random() * 20) + 5)
      commentsData.push(Math.floor(Math.random() * 80) + 20)
      sentimentData.push((Math.random() - 0.5) * 2)
      toxicityData.push(Math.random() * 10)
    }

    timeDataRef.current = timeData
    postsDataRef.current = postsData
    commentsDataRef.current = commentsData
    sentimentDataRef.current = sentimentData
    toxicityDataRef.current = toxicityData

    // Source distribution chart
    if (sourceDistributionRef.current) {
      Plotly.newPlot(sourceDistributionRef.current, [{
        labels: ['Reddit', 'News', 'Legal', 'Academic'],
        values: [65, 25, 7, 3],
        type: 'pie',
        marker: { colors: ['#ef4444', '#3b82f6', '#8b5cf6', '#10b981'] }
      }], {
        margin: { t: 20, r: 20, b: 20, l: 20 },
        plot_bgcolor: '#f9fafb',
        paper_bgcolor: 'white',
        showlegend: true
      }, { responsive: true, displayModeBar: false })
    }

    // Sentiment flow chart
    if (sentimentFlowRef.current) {
      Plotly.newPlot(sentimentFlowRef.current, [{
        x: timeData,
        y: sentimentData.map(v => Math.max(0, v)),
        name: 'Positive',
        type: 'scatter',
        mode: 'lines',
        fill: 'tozeroy',
        line: { color: '#10b981', width: 1, shape: 'spline' },
        fillcolor: 'rgba(16, 185, 129, 0.3)'
      }, {
        x: timeData,
        y: sentimentData.map(v => Math.min(0, v)),
        name: 'Negative',
        type: 'scatter',
        mode: 'lines',
        fill: 'tozeroy',
        line: { color: '#ef4444', width: 1, shape: 'spline' },
        fillcolor: 'rgba(239, 68, 68, 0.3)'
      }], {
        xaxis: { title: 'Time', nticks: 10 },
        yaxis: { title: 'Sentiment Score', range: [-1, 1] },
        margin: { t: 20, r: 20, b: 60, l: 60 },
        plot_bgcolor: '#f9fafb',
        paper_bgcolor: 'white'
      }, { responsive: true, displayModeBar: false })
    }

    return () => {
      [realtimeChartRef, sourceDistributionRef, sentimentFlowRef].forEach(ref => {
        if (ref.current) Plotly.purge(ref.current)
      })
    }
  }, [])

  // Update realtime chart when metric changes
  useEffect(() => {
    if (!realtimeChartRef.current) return

    let data = []
    let title = ''
    let color = ''

    switch (activeMetric) {
      case 'posts':
        data = postsDataRef.current
        title = 'Posts per Minute'
        color = '#3b82f6'
        break
      case 'comments':
        data = commentsDataRef.current
        title = 'Comments per Minute'
        color = '#10b981'
        break
      case 'sentiment':
        data = sentimentDataRef.current
        title = 'Average Sentiment'
        color = '#f59e0b'
        break
      case 'toxicity':
        data = toxicityDataRef.current
        title = 'Toxicity Level'
        color = '#ef4444'
        break
    }

    Plotly.newPlot(realtimeChartRef.current, [{
      x: timeDataRef.current,
      y: data,
      type: 'scatter',
      mode: 'lines',
      line: { color: color, width: 2, shape: 'spline' },
      fill: 'tozeroy',
      fillcolor: color + '20',
      name: title
    }], {
      title: title,
      xaxis: { title: 'Time', showgrid: false, nticks: 10 },
      yaxis: { title: 'Value' },
      margin: { t: 40, r: 20, b: 60, l: 60 },
      plot_bgcolor: '#f9fafb',
      paper_bgcolor: 'white',
      showlegend: false
    }, { responsive: true, displayModeBar: false })
  }, [activeMetric])

  // Live update interval with random delay
  useEffect(() => {
    if (isPaused) return

    let timeoutId = null
    let isCancelled = false

    const updateData = () => {
      if (isCancelled) return

      // Add new data points
      const newTime = new Date().toLocaleTimeString()
      const newPosts = Math.floor(Math.random() * 20) + 5
      const newComments = Math.floor(Math.random() * 80) + 20
      const newSentiment = (Math.random() - 0.5) * 2
      const newToxicity = Math.random() * 10

      timeDataRef.current.push(newTime)
      postsDataRef.current.push(newPosts)
      commentsDataRef.current.push(newComments)
      sentimentDataRef.current.push(newSentiment)
      toxicityDataRef.current.push(newToxicity)

      // Keep only last 100 points
      if (timeDataRef.current.length > 100) {
        timeDataRef.current.shift()
        postsDataRef.current.shift()
        commentsDataRef.current.shift()
        sentimentDataRef.current.shift()
        toxicityDataRef.current.shift()
      }

      // Update realtime chart - create new array copies for Plotly to detect changes
      let data = []
      let color = ''
      switch (activeMetric) {
        case 'posts': data = [...postsDataRef.current]; color = '#3b82f6'; break
        case 'comments': data = [...commentsDataRef.current]; color = '#10b981'; break
        case 'sentiment': data = [...sentimentDataRef.current]; color = '#f59e0b'; break
        case 'toxicity': data = [...toxicityDataRef.current]; color = '#ef4444'; break
      }

      if (realtimeChartRef.current) {
        Plotly.react(realtimeChartRef.current, [{
          x: [...timeDataRef.current],
          y: data,
          type: 'scatter',
          mode: 'lines',
          line: { color: color, width: 2, shape: 'spline' },
          fill: 'tozeroy',
          fillcolor: color + '20'
        }], {
          xaxis: { title: 'Time', showgrid: false, nticks: 10 },
          yaxis: { title: 'Value' },
          margin: { t: 40, r: 20, b: 60, l: 60 },
          plot_bgcolor: '#f9fafb',
          paper_bgcolor: 'white',
          showlegend: false
        })
      }

      // Update sentiment flow
      if (sentimentFlowRef.current) {
        const sentimentCopy = [...sentimentDataRef.current]
        Plotly.react(sentimentFlowRef.current, [{
          x: [...timeDataRef.current],
          y: sentimentCopy.map(v => Math.max(0, v)),
          name: 'Positive',
          type: 'scatter',
          mode: 'lines',
          fill: 'tozeroy',
          line: { color: '#10b981', width: 1, shape: 'spline' },
          fillcolor: 'rgba(16, 185, 129, 0.3)'
        }, {
          x: [...timeDataRef.current],
          y: sentimentCopy.map(v => Math.min(0, v)),
          name: 'Negative',
          type: 'scatter',
          mode: 'lines',
          fill: 'tozeroy',
          line: { color: '#ef4444', width: 1, shape: 'spline' },
          fillcolor: 'rgba(239, 68, 68, 0.3)'
        }], {
          xaxis: { title: 'Time', nticks: 10 },
          yaxis: { title: 'Sentiment Score', range: [-1, 1] },
          margin: { t: 20, r: 20, b: 60, l: 60 },
          plot_bgcolor: '#f9fafb',
          paper_bgcolor: 'white'
        })
      }

      // Add new feed item randomly (more frequent)
      if (autoScroll && Math.random() > 0.5) {
        const sources = ['reddit', 'news', 'legal']
        const sentiments = ['positive', 'negative', 'neutral']
        const source = sources[Math.floor(Math.random() * sources.length)]
        const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)]

        const sourceColors = {
          reddit: { bgColor: 'bg-red-50', borderColor: 'border-red-500', iconColor: 'text-red-600' },
          news: { bgColor: 'bg-blue-50', borderColor: 'border-blue-500', iconColor: 'text-blue-600' },
          legal: { bgColor: 'bg-purple-50', borderColor: 'border-purple-500', iconColor: 'text-purple-600' }
        }

        const sentimentColors = {
          positive: { bg: 'bg-green-100', text: 'text-green-800' },
          negative: { bg: 'bg-red-100', text: 'text-red-800' },
          neutral: { bg: 'bg-gray-100', text: 'text-gray-800' }
        }

        const contentMessages = [
          `New discussion about youth justice reform policies...`,
          `Community response to recent court decisions...`,
          `Analysis of rehabilitation program effectiveness...`,
          `Public opinion on criminal responsibility age...`,
          `Expert commentary on juvenile detention standards...`,
          `Local news coverage of youth crime statistics...`,
          `Legal perspective on constitutional challenges...`,
          `Research findings on recidivism rates...`
        ]

        const newItem = {
          id: Date.now(),
          source,
          time: 'just now',
          content: contentMessages[Math.floor(Math.random() * contentMessages.length)],
          tags: [
            { label: sentiment.charAt(0).toUpperCase() + sentiment.slice(1), ...sentimentColors[sentiment] },
            { label: `Reliability: 0.${Math.floor(Math.random() * 20) + 75}`, bg: 'bg-blue-100', text: 'text-blue-800' }
          ],
          ...sourceColors[source]
        }

        setFeedItems(prev => [newItem, ...prev.slice(0, 19)])
      }

      // Update activity metrics based on recent data
      const recentPosts = postsDataRef.current.slice(-10)
      const recentComments = commentsDataRef.current.slice(-10)
      const recentSentiment = sentimentDataRef.current.slice(-10)
      const recentToxicity = toxicityDataRef.current.slice(-10)

      setMetrics({
        postsPerMin: (recentPosts.reduce((a, b) => a + b, 0) / recentPosts.length).toFixed(1),
        commentsPerMin: (recentComments.reduce((a, b) => a + b, 0) / recentComments.length).toFixed(1),
        avgSentiment: (recentSentiment.reduce((a, b) => a + b, 0) / recentSentiment.length).toFixed(2),
        toxicityLevel: (recentToxicity.reduce((a, b) => a + b, 0) / recentToxicity.length).toFixed(1)
      })

      const randomDelay = Math.floor(Math.random() * 1000) + 1500
      timeoutId = setTimeout(updateData, randomDelay)
    }

    // Start the first update
    const initialDelay = Math.floor(Math.random() * 1000) + 1500
    timeoutId = setTimeout(updateData, initialDelay)

    return () => {
      isCancelled = true
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [isPaused, autoScroll, activeMetric])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header 
        title="Deep Evidence – Live Data" 
        subtitle="Real-time data stream and monitoring dashboard" 
      />

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Status Controls */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-6 flex-wrap">
              <div className="flex items-center gap-3">
                <div className={`w-3 h-3 rounded-full ${isPaused ? 'bg-yellow-500' : 'bg-green-500 animate-pulse'}`}></div>
                <span className="text-sm font-semibold text-gray-900">{isPaused ? 'PAUSED' : 'LIVE'}</span>
                <span className="text-xs text-gray-600">Last event: 3 seconds ago</span>
                <span className="text-xs text-gray-600">Events/min: 28</span>
              </div>

              <div className="flex items-center gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-600">Source</label>
                  <select className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white">
                    <option>All Sources</option>
                    <option>Reddit</option>
                    <option>News</option>
                    <option>Legal</option>
                  </select>
                </div>

                <div className="flex flex-col gap-1">
                  <label className="text-xs text-gray-600">Type</label>
                  <select className="px-3 py-1 border border-gray-300 rounded-md text-sm bg-white">
                    <option>All Types</option>
                    <option>Posts</option>
                    <option>Comments</option>
                    <option>Articles</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label className="flex items-center gap-2 text-sm">
                <input 
                  type="checkbox" 
                  checked={autoScroll} 
                  onChange={(e) => setAutoScroll(e.target.checked)}
                  className="rounded"
                />
                <span className="text-gray-700">Auto-scroll</span>
              </label>
              <button 
                onClick={() => setIsPaused(!isPaused)}
                className="px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <i className={`fa-solid ${isPaused ? 'fa-play' : 'fa-pause'} mr-1`}></i>
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Live Feed Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 h-[800px] flex flex-col">
              <div className="p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  <i className="fa-solid fa-stream mr-2 text-blue-600"></i>Live Data Stream
                </h3>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-3">
                {feedItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={`${item.bgColor} border-l-4 ${item.borderColor} p-3 rounded-r-lg animate-fadeIn`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <i className={`${getSourceIcon(item.source)} ${item.iconColor}`}></i>
                      <span className="text-sm font-medium text-gray-900">{getSourceName(item.source)}</span>
                      <span className="text-xs text-gray-500">{item.time}</span>
                    </div>
                    <p className="text-sm text-gray-800 mb-2">{item.content}</p>
                    <div className="flex gap-2 flex-wrap">
                      {item.tags.map((tag, idx) => (
                        <span key={idx} className={`px-2 py-1 text-xs ${tag.bg} ${tag.text} rounded`}>
                          {tag.label}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Realtime Charts */}
          <div className="lg:col-span-2 space-y-6">
            {/* Real-time Activity */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-4">
                <h3 className="text-lg font-semibold text-gray-900">
                  <i className="fa-solid fa-chart-line mr-2 text-blue-600"></i>Real-time Activity
                </h3>
                <div className="flex gap-2 flex-wrap">
                  {[
                    { key: 'posts', label: 'Posts/min' },
                    { key: 'comments', label: 'Comments/min' },
                    { key: 'sentiment', label: 'Sentiment avg' },
                    { key: 'toxicity', label: 'Toxicity' }
                  ].map((btn) => (
                    <button
                      key={btn.key}
                      onClick={() => setActiveMetric(btn.key)}
                      className={`px-3 py-1 text-xs rounded-md ${
                        activeMetric === btn.key 
                          ? 'bg-blue-600 text-white' 
                          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {btn.label}
                    </button>
                  ))}
                </div>
              </div>
              <div ref={realtimeChartRef} style={{ height: '300px' }}></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Activity Metrics */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  <i className="fa-solid fa-tachometer-alt mr-2 text-green-600"></i>Activity Metrics
                  <span className="ml-2 text-xs text-green-500 animate-pulse">● LIVE</span>
                </h4>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Posts per minute</span>
                      <span className="text-lg font-bold text-gray-900 transition-all">{metrics.postsPerMin}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-blue-500 h-2 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, (metrics.postsPerMin / 25) * 100)}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Comments per minute</span>
                      <span className="text-lg font-bold text-gray-900 transition-all">{metrics.commentsPerMin}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className="bg-green-500 h-2 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, (metrics.commentsPerMin / 100) * 100)}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Average sentiment</span>
                      <span className={`text-lg font-bold transition-all ${metrics.avgSentiment >= 0 ? 'text-green-600' : 'text-red-600'}`}>{metrics.avgSentiment}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className={`h-2 rounded-full transition-all duration-300 ${metrics.avgSentiment >= 0 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${((parseFloat(metrics.avgSentiment) + 1) / 2) * 100}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">Toxicity level</span>
                      <span className={`text-lg font-bold transition-all ${metrics.toxicityLevel > 7 ? 'text-red-600' : metrics.toxicityLevel > 4 ? 'text-yellow-600' : 'text-green-600'}`}>{metrics.toxicityLevel}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                      <div className={`h-2 rounded-full transition-all duration-300 ${metrics.toxicityLevel > 7 ? 'bg-red-500' : metrics.toxicityLevel > 4 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${metrics.toxicityLevel * 10}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Source Distribution */}
              <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">
                  <i className="fa-solid fa-chart-pie mr-2 text-purple-600"></i>Source Distribution (Last Hour)
                </h4>
                <div ref={sourceDistributionRef} style={{ height: '200px' }}></div>
              </div>
            </div>

            {/* Sentiment Flow */}
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">
                <i className="fa-solid fa-heart mr-2 text-red-600"></i>Sentiment Flow (Last 30 minutes)
              </h4>
              <div ref={sentimentFlowRef} style={{ height: '250px' }}></div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.5s ease-in;
        }
      `}</style>
    </div>
  )
}

export default DataPage

