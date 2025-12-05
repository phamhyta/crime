import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Plotly from 'plotly.js-dist-min'
import wordcloud from 'wordcloud'
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
  const groupsWordCloudRef = useRef(null)

  const topicData = [
    { 
      id: 'raise-age',
      name: 'Raise age to 14', 
      posts: 347, 
      comments: 2184, 
      trend: 'up', 
      sentiment: 'Mostly negative', 
      sentimentColor: 'bg-red-100 text-red-800',
      x: -0.5,
      y: 0.4,
      size: 40,
      color: '#ef4444',
      punitiveScore: -0.8,
      legalScore: 0.6,
      negativePercent: 65,
      neutralPercent: 25,
      positivePercent: 10
    },
    { 
      id: 'detention',
      name: 'Mandatory detention', 
      posts: 289, 
      comments: 1756, 
      trend: 'down', 
      sentiment: 'Mixed sentiment', 
      sentimentColor: 'bg-yellow-100 text-yellow-800',
      x: 0.3,
      y: -0.3,
      size: 30,
      color: '#f59e0b',
      punitiveScore: 0.5,
      legalScore: -0.4,
      negativePercent: 45,
      neutralPercent: 35,
      positivePercent: 20
    },
    { 
      id: 'police',
      name: 'Police overreach', 
      posts: 234, 
      comments: 1892, 
      trend: 'up', 
      sentiment: 'Mostly negative', 
      sentimentColor: 'bg-red-100 text-red-800',
      x: -0.2,
      y: 0.7,
      size: 35,
      color: '#ef4444',
      punitiveScore: -0.3,
      legalScore: 0.8,
      negativePercent: 70,
      neutralPercent: 20,
      positivePercent: 10
    },
    { 
      id: 'rehabilitation',
      name: 'Rehabilitation', 
      posts: 156, 
      comments: 892, 
      trend: 'up', 
      sentiment: 'Mostly positive', 
      sentimentColor: 'bg-green-100 text-green-800',
      x: 0.6,
      y: 0.2,
      size: 25,
      color: '#10b981',
      punitiveScore: 0.8,
      legalScore: 0.3,
      negativePercent: 15,
      neutralPercent: 30,
      positivePercent: 55
    },
    { 
      id: 'punishment',
      name: 'Punishment', 
      posts: 189, 
      comments: 1123, 
      trend: 'stable', 
      sentiment: 'Mostly negative', 
      sentimentColor: 'bg-red-100 text-red-800',
      x: -0.8,
      y: -0.6,
      size: 45,
      color: '#ef4444',
      punitiveScore: -0.9,
      legalScore: -0.7,
      negativePercent: 75,
      neutralPercent: 15,
      positivePercent: 10
    },
    { 
      id: 'legal-reform',
      name: 'Legal reform', 
      posts: 123, 
      comments: 654, 
      trend: 'up', 
      sentiment: 'Mixed sentiment', 
      sentimentColor: 'bg-gray-100 text-gray-800',
      x: 0.1,
      y: 0.5,
      size: 20,
      color: '#6b7280',
      punitiveScore: 0.2,
      legalScore: 0.6,
      negativePercent: 35,
      neutralPercent: 40,
      positivePercent: 25
    }
  ]

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
      const traces = topicData.map(topic => {
        const displayName = topic.name.length > 15 ? topic.name.substring(0, 15) + '...' : topic.name
        return {
          x: [topic.x],
          y: [topic.y],
          mode: 'markers+text',
          marker: {
            size: [topic.size * 2],
            color: topic.color,
            opacity: 0.75,
            line: { width: 3, color: topic.color }
          },
          text: [displayName],
          textposition: 'top center',
          textfont: { 
            size: 10, 
            color: '#374151', 
            family: 'Arial, sans-serif'
          },
          name: topic.name,
          customdata: [[topic.posts, topic.comments, topic.negativePercent, topic.neutralPercent, topic.positivePercent, topic.punitiveScore, topic.legalScore]],
          hovertemplate: '<b>' + topic.name + '</b><br>' +
            'Posts: %{customdata[0]:,}<br>' +
            'Comments: %{customdata[1]:,}<br>' +
            'Sentiment: %{customdata[2]}% Negative, %{customdata[3]}% Neutral, %{customdata[4]}% Positive<br>' +
            'Punitive Score: %{customdata[5]:+.1f}<br>' +
            'Legal Score: %{customdata[6]:+.1f}<extra></extra>',
          type: 'scatter'
        }
      })

      Plotly.newPlot(topicBubblesRef.current, traces, {
        title: { text: 'Topic Landscape', font: { size: 16 } },
        xaxis: { 
          title: { text: 'Punitive ← → Rehabilitative', font: { size: 12 } }, 
          range: [-1, 1],
          showgrid: true,
          gridcolor: '#e5e7eb',
          zeroline: true,
          zerolinecolor: '#9ca3af',
          zerolinewidth: 2
        },
        yaxis: { 
          title: { text: 'Legal ← → Emotional', font: { size: 12 } }, 
          range: [-1, 1],
          showgrid: true,
          gridcolor: '#e5e7eb',
          zeroline: true,
          zerolinecolor: '#9ca3af',
          zerolinewidth: 2
        },
        margin: { t: 60, r: 20, b: 70, l: 70 },
        plot_bgcolor: '#f9fafb',
        paper_bgcolor: 'white',
        hovermode: 'closest'
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

    const renderWordCloud = () => {
      if (!groupsWordCloudRef.current) return
      const container = groupsWordCloudRef.current.parentElement
      if (!container) return
      
      groupsWordCloudRef.current.width = container.clientWidth - 40
      groupsWordCloudRef.current.height = container.clientHeight - 40

      const groupsData = [
        ['Indigenous youth', 100],
        ['Police', 85],
        ['Victims', 80],
        ['Government', 75],
        ['Migrant communities', 70],
        ['Judges', 68],
        ['Rural youth', 65],
        ['Community', 62],
        ['Families', 60],
        ['Youth workers', 55],
        ['Legal experts', 52],
        ['Advocates', 50],
        ['Social workers', 48],
        ['Teachers', 46],
        ['Politicians', 45],
        ['Media', 40],
        ['Academics', 38],
        ['Activists', 36],
        ['Correctional officers', 35],
        ['Psychologists', 33],
        ['Lawyers', 32],
        ['Researchers', 30],
        ['Counselors', 30],
        ['Probation officers', 28],
        ['Mentors', 26],
        ['Volunteers', 24],
        ['Policy makers', 22],
        ['NGOs', 21],
        ['Detention staff', 20],
        ['Rehabilitation specialists', 20],
        ['Child protection workers', 18],
        ['Court officials', 17],
        ['Parole officers', 16],
        ['Youth mentors', 15],
        ['Community leaders', 14],
        ['Elders', 13],
        ['Religious leaders', 12],
        ['Cultural advisors', 12],
        ['Forensic psychologists', 10],
        ['Behavioral analysts', 9],
        ['Case managers', 9],
        ['Support workers', 8],
        ['Outreach coordinators', 8],
        ['Family support services', 7],
        ['Peer support workers', 7],
        ['Education specialists', 6],
        ['Employment counselors', 6],
        ['Substance abuse counselors', 5],
        ['Mental health workers', 5],
        ['Trauma specialists', 4],
        ['Restorative justice facilitators', 4],
        ['Mediators', 3],
        ['Victim advocates', 3],
        ['Witness support', 3]
      ]

      // Simple color array
      const colors = [
        '#3b82f6', '#ef4444', '#ec4899', '#6366f1', '#10b981',
        '#8b5cf6', '#f59e0b', '#14b8a6', '#f97316', '#06b6d4',
        '#84cc16', '#a855f7', '#06b6d4', '#10b981', '#6366f1',
        '#8b5cf6', '#a855f7', '#ec4899', '#f59e0b', '#14b8a6',
        '#3b82f6', '#84cc16', '#06b6d4', '#6b7280', '#9ca3af',
        '#d1d5db', '#e5e7eb', '#f3f4f6', '#dc2626', '#ea580c',
        '#ca8a04', '#65a30d', '#059669', '#0891b2', '#0284c7',
        '#2563eb', '#7c3aed', '#c026d3', '#db2777', '#e11d48',
        '#be123c', '#9f1239', '#831843', '#701a75', '#86198f',
        '#9333ea', '#7e22ce', '#6b21a8', '#581c87', '#4c1d95',
        '#4338ca', '#3730a3', '#312e81', '#1e1b4b', '#1e3a8a'
      ]

      wordcloud(groupsWordCloudRef.current, {
        list: groupsData,
        gridSize: 8,
        weightFactor: 1,
        fontFamily: 'Arial, sans-serif',
        color: function (word, weight) {
          const index = groupsData.findIndex(item => item[0] === word)
          return colors[index % colors.length] || '#000000'
        },
        rotateRatio: 0.1,
        rotationSteps: 2,
        backgroundColor: '#f0f9ff'
      })
    }
    
    // Render with small delay to ensure canvas is ready
    setTimeout(() => {
      renderWordCloud()
    }, 100)

    return () => {
      [timelineChartRef, subredditChartRef, topicBubblesRef, sentimentDistributionRef, sentimentTimelineRef, stanceDistributionRef, evidenceSourcesRef, groupSentimentRef, biasTimelineRef].forEach(ref => {
        if (ref.current) Plotly.purge(ref.current)
      })
    }
  }, [])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header title="Deep Evidence – Analysis" subtitle="Analysis of debate data from Reddit on youth crime policy" />

      <div className="max-w-7xl mx-auto px-6 py-6">
        <FilterBar />
        <KPISection />

        {/* Post Dynamics */}
        <div className="mb-4 bg-white rounded-md p-4 shadow-sm border border-gray-200">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Post Dynamics</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Analyze the temporal patterns and distribution of posts across different subreddits. 
              The timeline chart shows posting activity over time, revealing peak engagement periods 
              and trends in discussion volume. The subreddit breakdown highlights which communities 
              are most active in the youth crime policy debate.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
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
        <div className="mb-4 bg-white rounded-md p-4 shadow-sm border border-gray-200">
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-xl font-semibold text-gray-900">Topic & Argument Landscape</h3>
              <div className="flex items-center gap-4 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <span>Negative</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                  <span>Mixed</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span>Positive</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-600 leading-relaxed mt-2">
              Explore the positioning of different topics and arguments across the debate landscape. 
              The bubble chart maps topics along two key dimensions: Punitive vs Rehabilitative approaches 
              and Legal vs Emotional framing. Bubble size represents total engagement, while position 
              indicates argument stance. The overview panel provides detailed metrics for each topic, 
              including sentiment distribution and engagement statistics.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Chart Section - Left Side */}
            <div className='col-span-2'>
              <div ref={topicBubblesRef} style={{ height: '400px' }}></div>
              <div className="mt-4 flex items-center justify-center gap-8 text-xs text-gray-600">
                <div className="flex items-center gap-2">
                  <span className="font-medium">Bubble size</span>
                  <span>∝ Total engagement</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-medium">Position</span>
                  <span>Argument stance</span>
                </div>
              </div>
            </div>

            {/* Topic Cards Grid - Right Side */}
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-4">All Topics Overview</h4>
              <div className="grid grid-cols-1 gap-2 max-h-[400px] overflow-y-auto">
              {topicData.map((topic) => (
                <div 
                  key={topic.id} 
                  className="p-2 border border-gray-200 rounded-lg hover:shadow-md cursor-pointer transition-all"
                  style={{ borderLeft: `4px solid ${topic.color}` }}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h5 className="font-semibold text-gray-900 text-sm leading-tight">{topic.name}</h5>
                    <i className={`fa-solid fa-arrow-trend-${topic.trend} text-${topic.trend === 'up' ? 'green' : topic.trend === 'down' ? 'red' : 'gray'}-600 text-xs ml-2 flex-shrink-0`}></i>
                  </div>
                  
                  <div className="space-y-2 mb-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Posts</span>
                      <span className="font-semibold text-gray-900">{topic.posts.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-gray-600">Comments</span>
                      <span className="font-semibold text-gray-900">{topic.comments.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mb-1">
                    <div className="flex items-center justify-between text-xs mb-1">
                      <span className="text-gray-600">Sentiment</span>
                      <span className={`px-2 py-0.5 text-xs rounded ${topic.sentimentColor}`}>
                        {topic.sentiment}
                      </span>
                    </div>
                    <div className="flex gap-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div 
                        className="bg-red-500" 
                        style={{ width: `${topic.negativePercent}%` }}
                        title={`${topic.negativePercent}% Negative`}
                      ></div>
                      <div 
                        className="bg-gray-400" 
                        style={{ width: `${topic.neutralPercent}%` }}
                        title={`${topic.neutralPercent}% Neutral`}
                      ></div>
                      <div 
                        className="bg-green-500" 
                        style={{ width: `${topic.positivePercent}%` }}
                        title={`${topic.positivePercent}% Positive`}
                      ></div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-gray-100">
                    <div>
                      <span className="text-gray-600">Punitive Score</span>
                      <div className="font-semibold text-gray-900">
                        {topic.punitiveScore > 0 ? '+' : ''}{topic.punitiveScore.toFixed(1)}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-600">Legal Score</span>
                      <div className="font-semibold text-gray-900">
                        {topic.legalScore > 0 ? '+' : ''}{topic.legalScore.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              </div>
            </div>
          </div>
        </div>

        {/* Sentiment & Stance and Reliability */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {/* Sentiment & Stance */}
          <div className="bg-white rounded-md p-4 shadow-sm border border-gray-200">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sentiment & Stance Analysis</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Examine how sentiment evolves over time within the discourse, revealing patterns in emotional tone 
                and argumentative positions throughout the debate.
              </p>
            </div>
            <div ref={sentimentTimelineRef} style={{ height: '250px' }}></div>
          </div>

          {/* Reliability */}
          <div className="bg-white rounded-md p-4 shadow-sm border border-gray-200">
            <div className="mb-1">
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reliability & Evidence Quality</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Assess the credibility and quality of evidence, evaluating source reliability, consistency, and 
                alignment with verified information across multiple dimensions.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div ref={evidenceSourcesRef} style={{ height: '250px' }}></div>
              <div>
                <h4 className="text-lg font-medium text-gray-800 text-center">Reliability Score</h4>
                <div className="space-y-1">
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
            </div>
          </div>
        </div>

        {/* Bias Section */}
        <div className="mb-4 bg-white rounded-md p-4 shadow-sm border border-gray-200">
          <div className="mb-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Equity / Bias Signals</h3>
            <p className="text-sm text-gray-600 leading-relaxed">
              Track which groups are mentioned most frequently and analyze sentiment patterns across different 
              communities to identify potential biases and representation imbalances in the discourse.
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-4">Groups Mentioned</h4>
              <div 
                style={{ 
                  height: '300px', 
                  width: '100%',
                  backgroundColor: '#f0f9ff',
                  borderRadius: '8px',
                  padding: '2px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <canvas ref={groupsWordCloudRef} style={{ maxWidth: '100%', maxHeight: '100%' }}></canvas>
              </div>
            </div>
            <div ref={groupSentimentRef} style={{ height: '400px' }}></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default AnalysisPage

