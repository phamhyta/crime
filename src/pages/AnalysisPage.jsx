import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Plotly from 'plotly.js-dist-min'
import Header from '../components/Header'
import FilterBar from '../components/analysis/FilterBar'
import KPISection from '../components/analysis/KPISection'

function AnalysisPage() {
  const timelineChartRef = useRef(null)
  const subredditChartRef = useRef(null)
  const topicBubblesRef = useRef(null)
  const sentimentDistributionRef = useRef(null)
  const sentimentTimelineRef = useRef(null)
  const stanceDistributionRef = useRef(null)
  const evidenceSourcesRef = useRef(null)
  const citationNetworkRef = useRef(null)
  const groupSentimentRef = useRef(null)
  const biasTimelineRef = useRef(null)

  useEffect(() => {
    // Timeline Chart
    if (timelineChartRef.current) {
      Plotly.newPlot(timelineChartRef.current, [{
        x: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 29', 'Feb 5', 'Feb 12'],
        y: [45, 52, 48, 61, 58, 67, 72],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Posts',
        line: { color: '#3b82f6', width: 2 }
      }, {
        x: ['Jan 15', 'Feb 5'],
        y: [48, 67],
        mode: 'markers+text',
        name: 'Events',
        marker: { size: 12, color: '#ef4444', symbol: 'star' },
        text: ['News Event', 'Policy Announcement'],
        textposition: 'top center',
        showlegend: false
      }], {
        title: 'Posts Over Time',
        margin: { t: 40, r: 20, b: 60, l: 60 },
        plot_bgcolor: '#f9fafb',
        paper_bgcolor: 'white'
      }, { responsive: true, displayModeBar: false })
    }

    // Subreddit Chart
    if (subredditChartRef.current) {
      Plotly.newPlot(subredditChartRef.current, [{
        x: [347, 289, 234, 156, 123],
        y: ['r/australia', 'r/melbourne', 'r/sydney', 'r/legal', 'r/politics'],
        type: 'bar',
        orientation: 'h',
        name: 'Posts',
        marker: { color: '#3b82f6' }
      }, {
        x: [2184, 1756, 1892, 987, 654],
        y: ['r/australia', 'r/melbourne', 'r/sydney', 'r/legal', 'r/politics'],
        type: 'bar',
        orientation: 'h',
        name: 'Comments',
        marker: { color: '#10b981' }
      }], {
        barmode: 'stack',
        margin: { t: 20, r: 20, b: 40, l: 100 },
        plot_bgcolor: '#f9fafb',
        paper_bgcolor: 'white'
      }, { responsive: true, displayModeBar: false })
    }

    // Topic Bubbles
    if (topicBubblesRef.current) {
      Plotly.newPlot(topicBubblesRef.current, [{
        x: [-0.5, 0.3, -0.2, 0.6, -0.8, 0.1],
        y: [0.4, -0.3, 0.7, 0.2, -0.6, 0.5],
        mode: 'markers',
        marker: {
          size: [40, 30, 35, 25, 45, 20],
          color: ['#ef4444', '#f59e0b', '#ef4444', '#10b981', '#ef4444', '#6b7280'],
          opacity: [0.8, 0.6, 0.7, 0.9, 0.75, 0.5],
          line: { width: [3, 2, 2, 1, 3, 1], color: ['#dc2626', '#d97706', '#dc2626', '#059669', '#dc2626', '#4b5563'] }
        },
        text: ['Raise age to 14', 'Detention', 'Police overreach', 'Rehabilitation', 'Punishment', 'Legal reform'],
        textposition: 'top center',
        type: 'scatter'
      }], {
        title: 'Topic Landscape',
        xaxis: { title: 'Punitive ← → Rehabilitative', range: [-1, 1] },
        yaxis: { title: 'Legal ← → Emotional', range: [-1, 1] },
        margin: { t: 60, r: 20, b: 60, l: 60 },
        plot_bgcolor: '#f9fafb',
        paper_bgcolor: 'white'
      }, { responsive: true, displayModeBar: false })
    }

    // Sentiment Charts
    if (sentimentDistributionRef.current) {
      Plotly.newPlot(sentimentDistributionRef.current, [{
        labels: ['Negative', 'Neutral', 'Positive'],
        values: [45, 32, 23],
        type: 'pie',
        marker: { colors: ['#ef4444', '#6b7280', '#10b981'] }
      }], {
        title: 'Sentiment Distribution',
        margin: { t: 40, r: 20, b: 20, l: 20 },
        paper_bgcolor: 'white'
      }, { responsive: true, displayModeBar: false })
    }

    if (sentimentTimelineRef.current) {
      Plotly.newPlot(sentimentTimelineRef.current, [
        { x: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 29', 'Feb 5', 'Feb 12'], y: [25, 23, 22, 24, 23, 22, 23], name: 'Positive', type: 'scatter', mode: 'lines', fill: 'tonexty', line: { color: '#10b981', width: 0 }, fillcolor: 'rgba(16, 185, 129, 0.5)' },
        { x: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 29', 'Feb 5', 'Feb 12'], y: [32, 34, 35, 33, 32, 33, 32], name: 'Neutral', type: 'scatter', mode: 'lines', fill: 'tonexty', line: { color: '#6b7280', width: 0 }, fillcolor: 'rgba(107, 114, 128, 0.5)' },
        { x: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 29', 'Feb 5', 'Feb 12'], y: [43, 43, 43, 43, 45, 45, 45], name: 'Negative', type: 'scatter', mode: 'lines', fill: 'tonexty', line: { color: '#ef4444', width: 0 }, fillcolor: 'rgba(239, 68, 68, 0.5)' }
      ], {
        title: 'Sentiment Over Time',
        margin: { t: 40, r: 20, b: 60, l: 60 },
        plot_bgcolor: '#f9fafb',
        paper_bgcolor: 'white'
      }, { responsive: true, displayModeBar: false })
    }

    if (stanceDistributionRef.current) {
      Plotly.newPlot(stanceDistributionRef.current, [{
        x: ['Pro', 'Neutral', 'Against'],
        y: [28, 31, 41],
        type: 'bar',
        marker: { color: ['#10b981', '#6b7280', '#ef4444'] }
      }], {
        title: 'Stance: Raise Age to 14?',
        margin: { t: 40, r: 20, b: 60, l: 60 },
        plot_bgcolor: '#f9fafb',
        paper_bgcolor: 'white'
      }, { responsive: true, displayModeBar: false })
    }

    // Evidence Sources
    if (evidenceSourcesRef.current) {
      Plotly.newPlot(evidenceSourcesRef.current, [{
        x: ['No Citation', 'News', 'Gov', 'Academic', 'Personal'],
        y: [65, 20, 8, 4, 3],
        type: 'bar',
        marker: { color: ['#ef4444', '#f59e0b', '#10b981', '#3b82f6', '#6b7280'] }
      }], {
        title: 'Evidence Sources (%)',
        margin: { t: 40, r: 20, b: 80, l: 60 },
        plot_bgcolor: '#f9fafb',
        paper_bgcolor: 'white'
      }, { responsive: true, displayModeBar: false })
    }

    // Group Sentiment
    if (groupSentimentRef.current) {
      Plotly.newPlot(groupSentimentRef.current, [
        { x: ['Indigenous youth', 'Police', 'Government', 'Victims'], y: [25, 15, 30, 45], name: 'Positive', type: 'bar', marker: { color: '#10b981' } },
        { x: ['Indigenous youth', 'Police', 'Government', 'Victims'], y: [35, 25, 40, 35], name: 'Neutral', type: 'bar', marker: { color: '#6b7280' } },
        { x: ['Indigenous youth', 'Police', 'Government', 'Victims'], y: [40, 60, 30, 20], name: 'Negative', type: 'bar', marker: { color: '#ef4444' } }
      ], {
        title: 'Sentiment by Group',
        barmode: 'stack',
        margin: { t: 40, r: 20, b: 80, l: 60 },
        plot_bgcolor: '#f9fafb',
        paper_bgcolor: 'white'
      }, { responsive: true, displayModeBar: false })
    }

    // Bias Timeline
    if (biasTimelineRef.current) {
      Plotly.newPlot(biasTimelineRef.current, [{
        x: ['Jan 1', 'Jan 8', 'Jan 15', 'Jan 22', 'Jan 29', 'Feb 5', 'Feb 12'],
        y: [5.2, 5.8, 6.3, 7.1, 6.8, 6.5, 6.7],
        type: 'scatter',
        mode: 'lines+markers',
        line: { color: '#f59e0b', width: 2 },
        marker: { size: 8 }
      }], {
        title: 'Bias/Toxicity Index Over Time',
        margin: { t: 40, r: 20, b: 60, l: 60 },
        plot_bgcolor: '#f9fafb',
        paper_bgcolor: 'white'
      }, { responsive: true, displayModeBar: false })
    }

    return () => {
      [timelineChartRef, subredditChartRef, topicBubblesRef, sentimentDistributionRef, sentimentTimelineRef, stanceDistributionRef, evidenceSourcesRef, groupSentimentRef, biasTimelineRef].forEach(ref => {
        if (ref.current) Plotly.purge(ref.current)
      })
    }
  }, [])

  const topics = [
    { name: 'Raise age to 14', posts: 347, comments: 2184, trend: 'up', sentiment: 'Mostly negative', sentimentColor: 'bg-red-100 text-red-800' },
    { name: 'Mandatory detention', posts: 289, comments: 1756, trend: 'down', sentiment: 'Mixed sentiment', sentimentColor: 'bg-yellow-100 text-yellow-800' },
    { name: 'Police overreach', posts: 234, comments: 1892, trend: 'up', sentiment: 'Mostly negative', sentimentColor: 'bg-red-100 text-red-800' }
  ]

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Deep Evidence – Analysis" subtitle="Analysis of debate data from Reddit on youth crime policy" />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <FilterBar />
        <KPISection />

        {/* Post Dynamics */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Post Dynamics</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div ref={timelineChartRef} style={{ height: '300px' }}></div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-4">Top Subreddits</h4>
              <div ref={subredditChartRef} style={{ height: '300px' }}></div>
            </div>
          </div>
        </div>

        {/* Topic Landscape */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Topic & Argument Landscape</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <div ref={topicBubblesRef} style={{ height: '400px' }}></div>
            </div>
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-4">Top Topics</h4>
              <div className="space-y-4">
                {topics.map((topic, idx) => (
                  <div key={idx} className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-gray-900">{topic.name}</h5>
                      <i className={`fa-solid fa-arrow-trend-${topic.trend} text-${topic.trend === 'up' ? 'green' : 'red'}-600`}></i>
                    </div>
                    <p className="text-sm text-gray-600">{topic.posts} posts • {topic.comments} comments</p>
                    <span className={`inline-block px-2 py-1 text-xs ${topic.sentimentColor} rounded mt-2`}>{topic.sentiment}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sentiment & Stance */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Sentiment & Stance Analysis</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div ref={sentimentDistributionRef} style={{ height: '300px' }}></div>
            <div ref={sentimentTimelineRef} style={{ height: '300px' }}></div>
            <div ref={stanceDistributionRef} style={{ height: '300px' }}></div>
          </div>
        </div>

        {/* Reliability */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Reliability & Evidence Quality</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            <div ref={evidenceSourcesRef} style={{ height: '250px' }}></div>
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-4 text-center">Reliability Score</h4>
              <div className="space-y-3">
                {[{ label: 'Source Quality', value: '7.2', color: 'bg-green-500', width: '72%' }, { label: 'Consistency', value: '5.8', color: 'bg-yellow-500', width: '58%' }, { label: 'Alignment', value: '6.1', color: 'bg-orange-500', width: '61%' }].map((item, idx) => (
                  <div key={idx}>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">{item.label}</span>
                      <span className="text-sm font-bold text-gray-900">{item.value}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className={`${item.color} h-2 rounded-full`} style={{ width: item.width }}></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div></div>
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-4">Red Flags</h4>
              <div className="space-y-3">
                {[{ icon: 'fa-exclamation-triangle', color: 'text-yellow-500', title: 'Emotional Language', count: 147 }, { icon: 'fa-shield-halved', color: 'text-red-500', title: 'Possible Misinformation', count: 23 }, { icon: 'fa-fire', color: 'text-orange-500', title: 'Toxic Discussions', count: 89 }].map((flag, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <i className={`fa-solid ${flag.icon} ${flag.color} text-lg`}></i>
                    <div>
                      <p className="text-sm font-medium">{flag.title}</p>
                      <p className="text-xs text-gray-600">{flag.count} posts flagged</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bias Section */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Equity / Bias Signals</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-4">Groups Mentioned</h4>
              <div className="flex flex-wrap gap-2">
                {['Indigenous youth', 'Police', 'Migrant communities', 'Rural youth', 'Judges', 'Victims'].map((group, idx) => (
                  <span key={idx} className={`px-${idx === 0 ? 4 : 3} py-${idx === 0 ? 3 : 2} ${idx === 0 ? 'bg-blue-100 text-blue-800 text-xl' : 'bg-gray-100 text-gray-800'} rounded-lg font-medium cursor-pointer hover:opacity-80 transition`}>
                    {group}
                  </span>
                ))}
              </div>
            </div>
            <div ref={groupSentimentRef} style={{ height: '250px' }}></div>
          </div>
          <div>
            <h4 className="text-lg font-medium text-gray-800 mb-4">Bias Over Time</h4>
            <div ref={biasTimelineRef} style={{ height: '200px' }}></div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8 bg-white rounded-xl p-6 shadow-sm border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
          <div className="flex gap-4">
            <Link to="/qa" className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition">
              <i className="fa-solid fa-question-circle mr-2"></i>Ask Questions in QA
            </Link>
            <Link to="/debate" className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700 transition">
              <i className="fa-solid fa-comments mr-2"></i>Start Debate
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisPage
