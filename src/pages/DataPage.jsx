import { useState, useEffect, useRef } from 'react'
import Plotly from 'plotly.js-dist-min'
import Header from '../components/Header'
import NewsDetailModal from '../components/NewsDetailModal'

function DataPage() {
  const [autoScroll, setAutoScroll] = useState(true)
  const [isPaused, setIsPaused] = useState(false)
  const [activeMetric, setActiveMetric] = useState('posts')
  const [lastEventTime, setLastEventTime] = useState(Date.now())
  const [eventsPerMin, setEventsPerMin] = useState(28)
  const [eventTimestamps, setEventTimestamps] = useState([])
  const [metrics, setMetrics] = useState({
    postsPerMin: 12.5,
    commentsPerMin: 47.2,
    avgSentiment: -0.23,
    toxicityLevel: 6.8
  })
  const generateInitialFeedItems = () => {
    const sources = ['reddit', 'news', 'legal']
    const sourceColors = {
      reddit: { bgColor: 'bg-red-50', borderColor: 'border-red-500', iconColor: 'text-red-600' },
      news: { bgColor: 'bg-blue-50', borderColor: 'border-blue-500', iconColor: 'text-blue-600' },
      legal: { bgColor: 'bg-purple-50', borderColor: 'border-purple-500', iconColor: 'text-purple-600' }
    }
    const sentiments = ['positive', 'negative', 'neutral', 'mixed']
    const sentimentColors = {
      positive: { bg: 'bg-green-100', text: 'text-green-800' },
      negative: { bg: 'bg-red-100', text: 'text-red-800' },
      neutral: { bg: 'bg-gray-100', text: 'text-gray-800' },
      mixed: { bg: 'bg-yellow-100', text: 'text-yellow-800' }
    }
    const contentTemplates = [
      'New comment in r/australia: "These youth laws are completely broken and need urgent reform. The current system is failing both victims and young offenders with repeat offenses due to lack of proper rehabilitation."',
      'ABC published article: "Queensland youth justice law update brings new rehabilitation programs aimed at reducing recidivism among young offenders through education and mental health support."',
      'New post in r/melbourne: "Rehabilitation programs showing positive results in reducing recidivism. Programs focusing on education and job skills training have reduced reoffending rates by 35% over the past two years."',
      'Court ruling published: "Youth detention facility standards must be improved to meet international human rights obligations. The Supreme Court has ordered immediate upgrades to facilities within 12 months."',
      'New comment thread: "Police response to youth crime incidents needs complete overhaul. The heavy-handed approach is making things worse, not better. We need community policing and better training."',
      'The Guardian: "Indigenous youth justice reform recommendations highlight the need for culturally appropriate interventions and community-led solutions to address over-representation in detention."',
      'Discussion in r/legal: "Constitutional challenges to new legislation raise important questions about children\'s rights and the balance between public safety and rehabilitation goals."',
      'New analysis: "Youth crime statistics show declining trends when community-based programs are properly funded and implemented with early intervention strategies."',
      'Reddit post: "Community programs reducing recidivism rates demonstrate that investment in prevention and rehabilitation is far more effective than just locking kids up."',
      'News article: "Government announces new rehabilitation funding of $50 million for community-based programs focusing on education, mental health support, and family intervention."',
      'Legal document: "Supreme Court reviews juvenile sentencing practices and calls for increased judicial discretion in considering developmental factors and rehabilitation potential."',
      'Comment in r/sydney: "Local youth center opens new programs providing education, job training, and mental health services to at-risk youth in the community."',
      'News report: "Study finds positive impact of early intervention programs showing that children who receive support before entering the justice system have significantly better outcomes."',
      'Reddit discussion: "Public opinion on criminal responsibility age reveals divided views between those advocating for rehabilitation and those prioritizing public safety concerns."',
      'Court case update: "Appeal filed for youth detention ruling challenges the constitutionality of current practices and calls for immediate improvements to facility conditions."',
      'Article published: "Experts debate rehabilitation vs punishment approaches, with neuroscience research supporting age-appropriate interventions for young offenders."',
      'New post: "Community response to recent policy changes shows mixed reactions, with advocates welcoming reforms while some express concerns about implementation challenges."',
      'Legal brief: "Constitutional analysis of youth justice laws examines the balance between protecting children\'s rights and ensuring community safety through appropriate interventions."',
      'News coverage: "Youth crime rates in regional areas highlight the need for targeted programs addressing unique challenges faced by rural and remote communities."',
      'Reddit thread: "Personal experiences with justice system reveal both success stories from rehabilitation programs and ongoing concerns about systemic issues and resource allocation."',
      'Report released: "Academic research on juvenile offenders demonstrates that brain development continues until age 25, affecting impulse control and decision-making capacity."',
      'Comment: "Police training programs for youth interactions emphasize de-escalation techniques and understanding of adolescent development to improve outcomes and reduce conflicts."',
      'Article: "International comparisons of youth justice systems show that countries with higher minimum ages of criminal responsibility have better long-term outcomes for young people."',
      'Legal update: "New legislation passes parliament introducing alternative sentencing options and increased funding for youth detention facility improvements across the state."',
      'Discussion: "Mental health support in detention facilities remains inadequate, with experts calling for comprehensive services addressing trauma and developmental needs of young offenders."',
      'News: "Community leaders call for reform emphasizing the importance of culturally appropriate interventions and community involvement in developing solutions to youth crime."',
      'Post: "Success stories from rehabilitation programs highlight how education, job training, and family support can transform lives and prevent future involvement in the justice system."',
      'Legal opinion: "Judicial discretion in youth cases allows courts to consider individual circumstances, developmental factors, and rehabilitation potential when making sentencing decisions."',
      'Article: "Media coverage impact on public perception shapes debates about youth crime policy, with balanced reporting crucial for informed public discourse."',
      'Comment: "Educational programs in correctional facilities provide opportunities for young offenders to continue learning and develop skills needed for successful reintegration into society."',
      'Report: "Long-term outcomes of intervention programs show that early support and prevention strategies are more cost-effective than detention, saving $4.20 for every dollar invested."',
      'News: "Government consultation on policy changes engages stakeholders including families, advocates, legal experts, and community organizations to develop comprehensive reform proposals."',
      'Reddit: "Family perspectives on youth justice reveal the emotional and financial toll on families while highlighting the importance of support services and early intervention programs."',
      'Legal case: "Landmark decision on detention standards sets important precedents for future cases involving juvenile offenders and establishes minimum requirements for facility conditions."',
      'Article: "Economic costs of youth crime analysis reveals that investment in prevention and rehabilitation programs generates significant savings compared to long-term detention and recidivism."',
      'Discussion: "Cultural considerations in justice system emphasize the need for culturally appropriate interventions that respect Indigenous traditions and involve community elders in decision-making."',
      'News: "Technology solutions for monitoring programs offer new approaches to supervision and support while maintaining community connections and reducing reliance on detention facilities."',
      'Post: "Volunteer experiences in youth centers demonstrate the positive impact of mentorship and community support in helping young people navigate challenges and build positive futures."',
      'Legal analysis: "Rights of young offenders examines international standards and domestic legislation to ensure that children in the justice system receive appropriate protection and support."',
      'Report: "Recidivism rates by intervention type show that community-based programs with comprehensive support services achieve significantly better outcomes than punitive approaches."',
      'Comment: "Public safety vs rehabilitation debate continues with evidence supporting both perspectives, highlighting the complexity of balancing competing interests in youth justice policy."',
      'Article: "International best practices review identifies successful approaches from other jurisdictions that could be adapted to improve outcomes for young offenders in Queensland."',
      'News: "Funding announced for new initiatives includes $30 million for early intervention programs and $20 million for improving detention facility conditions and support services."',
      'Reddit: "Community engagement in policy development ensures that reforms reflect local needs and priorities while building support for evidence-based approaches to youth justice."',
      'Legal update: "Appeals court ruling published clarifies legal standards for youth detention practices and establishes guidelines for future cases involving juvenile offenders."',
      'Discussion: "Role of families in rehabilitation emphasizes the importance of family support and involvement in helping young offenders successfully reintegrate into their communities."',
      'Report: "Effectiveness of different program models compares outcomes across various intervention approaches to identify best practices and inform future policy development."',
      'Article: "Media representation of youth crime influences public opinion and policy debates, with balanced coverage essential for understanding complex issues and potential solutions."',
      'Comment: "Support services for affected families provide crucial assistance during difficult times, helping families navigate the justice system and access resources for their children."',
      'News: "Cross-party support for reform measures demonstrates broad recognition of the need for evidence-based approaches to youth justice that prioritize rehabilitation and prevention."'
    ]
    
    const items = []
    const now = Date.now()
    
    for (let i = 0; i < 50; i++) {
      const source = sources[Math.floor(Math.random() * sources.length)]
      const sentiment = sentiments[Math.floor(Math.random() * sentiments.length)]
      const minutesAgo = Math.floor(Math.random() * 480) + 1
      const timestamp = now - minutesAgo * 60 * 1000
      
      const reliability = (0.75 + Math.random() * 0.2).toFixed(2)
      const tags = [
        { label: sentiment.charAt(0).toUpperCase() + sentiment.slice(1), ...sentimentColors[sentiment] },
        { label: `Reliability: ${reliability}`, bg: 'bg-blue-100', text: 'text-blue-800' }
      ]
      
      if (Math.random() > 0.7) {
        tags.push({ label: 'Evidence-backed', bg: 'bg-indigo-100', text: 'text-indigo-800' })
      }
      if (Math.random() > 0.8) {
        tags.push({ label: sentiment === 'negative' ? 'High Toxicity' : 'Low Toxicity', 
          bg: sentiment === 'negative' ? 'bg-red-100' : 'bg-green-100', 
          text: sentiment === 'negative' ? 'text-red-800' : 'text-green-800' })
      }
      
      items.push({
        id: i + 1,
        source,
        timestamp,
        content: contentTemplates[i % contentTemplates.length],
        tags,
        ...sourceColors[source]
      })
    }
    
    return items.sort((a, b) => b.timestamp - a.timestamp)
  }

  const [feedItems, setFeedItems] = useState(generateInitialFeedItems())
  const [selectedNewsItem, setSelectedNewsItem] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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

  const getTimeAgo = (timestamp) => {
    const seconds = Math.floor((Date.now() - timestamp) / 1000)
    if (seconds < 60) return `${seconds} second${seconds !== 1 ? 's' : ''} ago`
    const minutes = Math.floor(seconds / 60)
    if (minutes < 60) return `${minutes} minute${minutes !== 1 ? 's' : ''} ago`
    const hours = Math.floor(minutes / 60)
    return `${hours} hour${hours !== 1 ? 's' : ''} ago`
  }

  const formatRelativeShort = (timestamp) => {
    const diff = Date.now() - timestamp
    const minutes = Math.floor(diff / 60000)
    if (minutes < 1) return 'just now'
    if (minutes < 60) return `${minutes}m ago`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h ago`
    const days = Math.floor(hours / 24)
    return `${days}d ago`
  }

  const convertFeedItemToModalData = (item) => {
    const sentimentTag = item.tags.find(tag => ['Positive', 'Negative', 'Neutral', 'Mixed'].includes(tag.label))
    const sentiment = sentimentTag ? sentimentTag.label.toLowerCase() : 'neutral'
    const reliabilityTag = item.tags.find(tag => tag.label.includes('Reliability:'))
    const reliability = reliabilityTag ? reliabilityTag.label.replace('Reliability: ', '') : '0.85'
    const toxicityTag = item.tags.find(tag => tag.label.includes('Toxicity'))
    const toxicity = toxicityTag ? toxicityTag.label.replace('Toxicity: ', '') : 'Low'

    const fullContentTemplates = {
      'reddit': `This discussion explores important perspectives on youth justice reform. The content highlights community concerns and experiences related to the current system. ${item.content} This represents a valuable contribution to the ongoing public discourse on criminal justice policy.`,
      'news': `This news article provides detailed coverage of recent developments in youth justice policy. ${item.content} The reporting includes expert commentary and analysis of the implications for affected communities and stakeholders.`,
      'legal': `This legal document presents official information regarding youth justice regulations and court decisions. ${item.content} It outlines the legal framework and procedural requirements for relevant cases.`
    }

    const contentTemplates = {
      'reddit': [
        'These youth laws are completely broken and need urgent reform. The current system is failing both the victims and the young offenders. We\'re seeing repeat offenses because there\'s no proper rehabilitation, just punishment that doesn\'t address the root causes. The statistics speak for themselves - recidivism rates are through the roof. Something needs to change, and it needs to change now.',
        'Rehabilitation programs showing positive results in reducing recidivism among young offenders. Just saw the latest report from the Victorian Youth Justice Department - programs focusing on education and job skills training have reduced reoffending rates by 35% over the past two years. This is exactly what we need more of. Investment in prevention and rehabilitation is far more effective than just locking kids up. Real success stories here.',
        'Police response to youth crime incidents needs complete overhaul. The heavy-handed approach is making things worse, not better. We need community policing and better training on dealing with young people. But at the same time, police are dealing with impossible situations with no support. It\'s a mess from top to bottom.'
      ],
      'news': [
        'Queensland youth justice law update brings new rehabilitation programs aimed at reducing recidivism among young offenders. The state government announced a $50 million investment in community-based programs focusing on education, mental health support, and family intervention. The new legislation includes provisions for alternative sentencing options and increased funding for youth detention facility improvements. Legal experts say the changes represent a significant shift toward a more rehabilitative approach.',
        'A comprehensive study released today reveals promising trends in youth justice reform across multiple Australian states. The research, conducted over three years, shows significant improvements in rehabilitation outcomes when community-based programs are properly funded and implemented. Experts emphasize the importance of early intervention and family support systems.',
        'Recent policy changes in youth justice legislation have sparked debate among legal professionals and community advocates. While some welcome the reforms as necessary modernization, others express concerns about implementation challenges and resource allocation.'
      ],
      'legal': [
        'Court ruling published: Youth detention facility standards must be improved to meet international human rights obligations. The Supreme Court has ordered immediate upgrades to facilities within 12 months, citing inadequate educational provisions, mental health services, and living conditions. The ruling affects 14 detention centers across the state and requires quarterly progress reports.',
        'Legal framework updated: New regulations governing youth justice procedures have been enacted following extensive consultation with stakeholders. The changes address procedural fairness, rights protection, and accountability measures for all parties involved in the juvenile justice system.',
        'Appellate decision: The Court of Appeals has issued a significant ruling clarifying the legal standards for youth detention practices. This decision sets important precedents for future cases involving juvenile offenders and detention facility conditions.'
      ]
    }

    const getFullContent = () => {
      const template = fullContentTemplates[item.source] || item.content
      const randomIndex = Math.floor(Math.random() * (contentTemplates[item.source]?.length || 1))
      return contentTemplates[item.source]?.[randomIndex] || template
    }

    const getSourceDisplayName = () => {
      switch (item.source) {
        case 'reddit': return `r/australia • Posted ${formatRelativeShort(item.timestamp)}`
        case 'news': return `ABC News • Published ${formatRelativeShort(item.timestamp)}`
        case 'legal': return `Supreme Court • Published ${formatRelativeShort(item.timestamp)}`
        default: return `${getSourceName(item.source)} • ${formatRelativeShort(item.timestamp)}`
      }
    }

    const getTitle = () => {
      const titleMap = {
        'reddit': 'Youth Justice System Reform Discussion',
        'news': 'Queensland Youth Justice Law Update',
        'legal': 'Court Ruling on Youth Detention Standards'
      }
      return titleMap[item.source] || `${getSourceName(item.source)} Content`
    }

    const getAuthor = () => {
      switch (item.source) {
        case 'reddit': return `user_${Math.floor(Math.random() * 10000)}`
        case 'news': return 'Sarah Mitchell, Legal Affairs Reporter'
        case 'legal': return 'Supreme Court Registry'
        default: return 'Unknown'
      }
    }

    const getEngagement = () => {
      switch (item.source) {
        case 'reddit': return `${Math.floor(Math.random() * 200) + 20} upvotes, ${Math.floor(Math.random() * 50) + 10} comments`
        case 'news': return `${Math.floor(Math.random() * 5000) + 500} views, ${Math.floor(Math.random() * 200) + 50} shares`
        case 'legal': return 'Official court document'
        default: return 'N/A'
      }
    }

    const getCategory = () => {
      const categories = {
        'reddit': 'Youth Justice Reform',
        'news': 'Policy Update',
        'legal': 'Legal Ruling'
      }
      return categories[item.source] || 'General'
    }

    const getTopics = () => {
      const topicsMap = {
        'reddit': ['Reform', 'Recidivism', 'Rehabilitation', 'System Failure'],
        'news': ['Policy', 'Rehabilitation', 'Government Investment', 'Legal Reform'],
        'legal': ['Human Rights', 'Detention Standards', 'Court Order', 'Facility Improvement']
      }
      return topicsMap[item.source] || ['General Discussion', 'News Update']
    }

    const getCitations = () => {
      const citationsMap = {
        'reddit': [
          { text: 'Recidivism statistics from Australian Institute of Criminology', url: '#', type: 'Government Data' },
          { text: 'Youth detention facility reports', url: '#', type: 'Official Report' }
        ],
        'news': [
          { text: 'Queensland Government Press Release', url: '#', type: 'Official Statement' },
          { text: 'Legal expert commentary from QUT Law School', url: '#', type: 'Academic Source' },
          { text: 'Budget allocation documents', url: '#', type: 'Government Data' }
        ],
        'legal': [
          { text: 'UN Convention on the Rights of the Child', url: '#', type: 'International Law' },
          { text: 'State detention facility audit reports', url: '#', type: 'Government Audit' }
        ]
      }
      return citationsMap[item.source] || []
    }

    const getSentimentAnalysis = () => {
      const analysisMap = {
        'positive': 'Positive sentiment with optimism about rehabilitation effectiveness. Evidence-based argumentation.',
        'negative': 'Strong negative sentiment with frustration and urgency. Language indicates systemic criticism and call for action.',
        'neutral': 'Neutral, factual reporting with balanced presentation of information and expert commentary.',
        'mixed': 'Mixed sentiment showing frustration with current system while acknowledging complexity. Emotional language with some inflammatory elements.'
      }
      return analysisMap[sentiment] || 'Neutral sentiment detected with clear emotional indicators.'
    }

    const getStance = () => {
      const stanceMap = {
        'positive': 'Strongly pro-rehabilitation approach',
        'negative': 'Pro-reform, critical of current punitive approach',
        'neutral': 'Neutral reporting on pro-rehabilitation policy changes',
        'mixed': 'Critical of current approach, advocates for reform'
      }
      return stanceMap[sentiment] || 'Neutral reporting stance with balanced perspective.'
    }

    return {
      ...item,
      title: getTitle(),
      subtitle: getSourceDisplayName(),
      fullContent: getFullContent(),
      sentiment: sentiment,
      reliability: reliability,
      toxicity: toxicity,
      author: getAuthor(),
      engagement: getEngagement(),
      category: getCategory(),
      topics: getTopics(),
      citations: getCitations(),
      sentimentAnalysis: getSentimentAnalysis(),
      stance: getStance(),
      sourceUrl: item.source === 'reddit' 
        ? 'https://www.reddit.com/r/australia/comments/1h1np6r/still_have_their_baby_teeth_queensland_children/'
        : item.source === 'news'
        ? 'https://www.reddit.com/r/AustralianPolitics/comments/1h1o6ve/still_have_their_baby_teeth_queensland_children/'
        : 'https://www.reddit.com/r/AustralianPolitics/comments/1ouy96k/shame_on_the_premier_plan_for_children_to_face/'
    }
  }

  const handleOpenModal = (item) => {
    const modalData = convertFeedItemToModalData(item)
    setSelectedNewsItem(modalData)
    setIsModalOpen(true)
  }

  const handleCloseModal = () => {
    setIsModalOpen(false)
    setSelectedNewsItem(null)
  }

  useEffect(() => {
    // Initialize data
    const timeData = []
    const postsData = []
    const commentsData = []
    const sentimentData = []
    const toxicityData = []

    for (let i = 0; i < 130; i++) {
      timeData.push(new Date(Date.now() - (300 - i) * 500).toLocaleTimeString())
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
        line: { color: '#10b981', width: 1 },
        fillcolor: 'rgba(16, 185, 129, 0.3)'
      }, {
        x: timeData,
        y: sentimentData.map(v => Math.min(0, v)),
        name: 'Negative',
        type: 'scatter',
        mode: 'lines',
        fill: 'tozeroy',
        line: { color: '#ef4444', width: 1 },
        fillcolor: 'rgba(239, 68, 68, 0.3)'
      }], {
        xaxis: { title: 'Time', nticks: 6 },
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
      line: { color: color, width: 2 },
      fill: 'tozeroy',
      fillcolor: color + '20',
      name: title
    }], {
      title: title,
      xaxis: { title: 'Time', showgrid: false, nticks: 6 },
      yaxis: { title: 'Value' },
      margin: { t: 40, r: 20, b: 60, l: 60 },
      plot_bgcolor: '#f9fafb',
      paper_bgcolor: 'white',
      showlegend: false
    }, { responsive: true, displayModeBar: false })
  }, [activeMetric])

  // Update last event time display and events per minute
  useEffect(() => {
    if (isPaused) return

    const interval = setInterval(() => {
      // Calculate events per minute from timestamps in last 60 seconds
      const now = Date.now()
      const oneMinuteAgo = now - 60000
      const recentEvents = eventTimestamps.filter(timestamp => timestamp > oneMinuteAgo)
      setEventsPerMin(recentEvents.length)
    }, 1000)

    return () => clearInterval(interval)
  }, [isPaused, lastEventTime, eventTimestamps])

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

      // Update last event time for each data update
      const now = Date.now()
      setLastEventTime(now)

      // Keep only last 300 points
      if (timeDataRef.current.length > 300) {
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
          line: { color: color, width: 2 },
          fill: 'tozeroy',
          fillcolor: color + '20'
        }], {
          xaxis: { title: 'Time', showgrid: false, nticks: 6 },
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
          line: { color: '#10b981', width: 1 },
          fillcolor: 'rgba(16, 185, 129, 0.3)'
        }, {
          x: [...timeDataRef.current],
          y: sentimentCopy.map(v => Math.min(0, v)),
          name: 'Negative',
          type: 'scatter',
          mode: 'lines',
          fill: 'tozeroy',
          line: { color: '#ef4444', width: 1 },
          fillcolor: 'rgba(239, 68, 68, 0.3)'
        }], {
          xaxis: { title: 'Time', nticks: 6 },
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
          `New discussion about youth justice reform policies highlights the need for evidence-based approaches balancing public safety with rehabilitation goals.`,
          `Community response to recent court decisions shows mixed reactions with advocates welcoming reforms while some express concerns about implementation and resource allocation.`,
          `Analysis of rehabilitation program effectiveness demonstrates that community-based interventions achieve 35% lower recidivism rates compared to traditional punitive approaches.`,
          `Public opinion on criminal responsibility age reveals divided views between those advocating for raising the age to 14 and those prioritizing community safety concerns.`,
          `Expert commentary on juvenile detention standards calls for immediate improvements to meet international human rights obligations and address systemic issues in facilities.`,
          `Local news coverage of youth crime statistics shows declining trends in areas with well-funded early intervention programs and community support services.`,
          `Legal perspective on constitutional challenges examines the balance between protecting children's rights and ensuring appropriate accountability for serious offenses.`,
          `Research findings on recidivism rates indicate that investment in prevention and rehabilitation programs saves $4.20 for every dollar spent compared to detention costs.`
        ]

        const newItem = {
          id: Date.now(),
          source,
          timestamp: Date.now(),
          content: contentMessages[Math.floor(Math.random() * contentMessages.length)],
          tags: [
            { label: sentiment.charAt(0).toUpperCase() + sentiment.slice(1), ...sentimentColors[sentiment] },
            { label: `Reliability: 0.${Math.floor(Math.random() * 20) + 75}`, bg: 'bg-blue-100', text: 'text-blue-800' }
          ],
          ...sourceColors[source]
        }

        setFeedItems(prev => [newItem, ...prev.slice(0, 49)])
        
        // Update last event time and add to timestamps
        const now = Date.now()
        setLastEventTime(now)
        setEventTimestamps(prev => {
          const updated = [...prev, now]
          // Keep only timestamps from last 60 seconds
          const oneMinuteAgo = now - 60000
          return updated.filter(timestamp => timestamp > oneMinuteAgo)
        })
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

      const randomDelay = Math.floor(Math.random() * 120000) + 120000
      timeoutId = setTimeout(updateData, randomDelay)
    }

    // Start the first update
    const initialDelay = Math.floor(Math.random() * 120000) + 120000
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

      <div className="max-w-[1400px] mx-auto px-2 py-1">
        {/* Status Controls */}
        <div className="bg-white p-2 shadow-sm border border-gray-200 mb-0.5">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-2">
                <div className={`w-3 h-3 rounded-full ${isPaused ? 'bg-yellow-500' : 'bg-green-500 animate-pulse'}`}></div>
                <span className="text-sm font-semibold text-gray-900">{isPaused ? 'PAUSED' : 'LIVE'}</span>
                <span className="text-xs text-gray-600">Last event: {getTimeAgo(lastEventTime)}</span>
                <span className="text-xs text-gray-600">Events/min: {eventsPerMin}</span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <label className="text-xs text-gray-600 whitespace-nowrap">Source</label>
                  <select className="px-2 py-0.5 border border-gray-300 rounded-md text-xs bg-white">
                    <option>All Sources</option>
                    <option>Reddit</option>
                    <option>News</option>
                    <option>Legal</option>
                  </select>
                </div>

                <div className="flex items-center gap-1">
                  <label className="text-xs text-gray-600 whitespace-nowrap">Type</label>
                  <select className="px-2 py-0.5 border border-gray-300 rounded-md text-xs bg-white">
                    <option>All Types</option>
                    <option>Posts</option>
                    <option>Comments</option>
                    <option>Articles</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <label className="flex items-center gap-1 text-xs">
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
                className="px-2 py-0.5 text-xs text-gray-600 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <i className={`fa-solid ${isPaused ? 'fa-play' : 'fa-pause'} mr-1`}></i>
                {isPaused ? 'Resume' : 'Pause'}
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-1">
          {/* Realtime Charts */}
          <div className="lg:col-span-1 space-y-1">
            {/* Real-time Activity */}
            <div className="bg-white p-1 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between flex-wrap">
                <h3 className="text-base font-semibold text-gray-900">
                  <i className="fa-solid fa-chart-line mr-1 text-blue-600"></i>Real-time Activity
                </h3>
                <div className="flex gap-1 flex-wrap">
                  {[
                    { key: 'posts', label: 'Posts/min' },
                    { key: 'comments', label: 'Comments/min' },
                    { key: 'sentiment', label: 'Sentiment avg' },
                    { key: 'toxicity', label: 'Toxicity' }
                  ].map((btn) => (
                    <button
                      key={btn.key}
                      onClick={() => setActiveMetric(btn.key)}
                      className={`px-2 py-0.5 text-xs rounded-md ${
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

            <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
              {/* Activity Metrics */}
              <div className="bg-white p-1 shadow-sm border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  <i className="fa-solid fa-tachometer-alt mr-1 text-green-600"></i>Activity Metrics
                  <span className="ml-1 text-xs text-green-500 animate-pulse">● LIVE</span>
                </h4>
                <div className="space-y-1">
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Posts per minute</span>
                      <span className="text-sm font-bold text-gray-900 transition-all">{metrics.postsPerMin}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-0.5">
                      <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, (metrics.postsPerMin / 25) * 100)}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Comments per minute</span>
                      <span className="text-sm font-bold text-gray-900 transition-all">{metrics.commentsPerMin}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-0.5">
                      <div className="bg-green-500 h-1.5 rounded-full transition-all duration-300" style={{ width: `${Math.min(100, (metrics.commentsPerMin / 100) * 100)}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Average sentiment</span>
                      <span className={`text-sm font-bold transition-all ${metrics.avgSentiment >= 0 ? 'text-green-600' : 'text-red-600'}`}>{metrics.avgSentiment}</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-0.5">
                      <div className={`h-1.5 rounded-full transition-all duration-300 ${metrics.avgSentiment >= 0 ? 'bg-green-500' : 'bg-red-500'}`} style={{ width: `${((parseFloat(metrics.avgSentiment) + 1) / 2) * 100}%` }}></div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-600">Toxicity level</span>
                      <span className={`text-sm font-bold transition-all ${metrics.toxicityLevel > 7 ? 'text-red-600' : metrics.toxicityLevel > 4 ? 'text-yellow-600' : 'text-green-600'}`}>{metrics.toxicityLevel}/10</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-1.5 mt-0.5">
                      <div className={`h-1.5 rounded-full transition-all duration-300 ${metrics.toxicityLevel > 7 ? 'bg-red-500' : metrics.toxicityLevel > 4 ? 'bg-yellow-500' : 'bg-green-500'}`} style={{ width: `${metrics.toxicityLevel * 10}%` }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Source Distribution */}
              <div className="bg-white p-1 shadow-sm border border-gray-200">
                <h4 className="text-sm font-semibold text-gray-900 mb-1">
                  <i className="fa-solid fa-chart-pie mr-1 text-purple-600"></i>Source Distribution
                </h4>
                <div ref={sourceDistributionRef} style={{ height: '150px' }}></div>
              </div>
            </div>

            {/* Sentiment Flow */}
            <div className="bg-white p-1 shadow-sm border border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900">
                  <i className="fa-solid fa-heart mr-1 text-red-600"></i>Sentiment Flow (Last 30 minutes)
              </h4>
              <div ref={sentimentFlowRef} style={{ height: '280px' }}></div>
            </div>
          </div>

          {/* Live Feed Section */}
          <div className="lg:col-span-2">
            <div className="bg-white shadow-sm border border-gray-200 min-h-[760px] max-h-[855px] flex flex-col">
              <div className="p-1 border-b border-gray-200">
                <h3 className="text-base font-semibold text-gray-900">
                  <i className="fa-solid fa-stream mr-1 text-blue-600"></i>Live Data Stream
                </h3>
              </div>

              <div className="flex-1 overflow-y-auto p-0.5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-0.5">
                {feedItems.map((item) => (
                  <div 
                    key={item.id} 
                    className={`${item.bgColor} border-l-4 ${item.borderColor} p-1 rounded-r-lg animate-fadeIn cursor-pointer hover:opacity-80 transition`}
                    onClick={() => handleOpenModal(item)}
                  >
                    <div className="flex items-center justify-between mb-0.5">
                      <div className="flex items-center gap-1">
                        <i className={`${getSourceIcon(item.source)} ${item.iconColor} text-xs`}></i>
                        <span className="text-xs font-medium text-gray-900">{getSourceName(item.source)}</span>
                        <span className="text-xs text-gray-500">{formatRelativeShort(item.timestamp)}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {item.tags.slice(0, 2).map((tag, idx) => (
                          <span key={idx} className={`px-1 py-0.5 text-xs ${tag.bg} ${tag.text} rounded`}>
                            {tag.label}
                          </span>
                        ))}
                      </div>
                    </div>
                    <p className="text-xs text-gray-800 line-clamp-1 leading-tight">{item.content}</p>
                  </div>
                ))}
                </div>
              </div>
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

      <NewsDetailModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        newsItem={selectedNewsItem}
      />
    </div>
  )
}

export default DataPage

