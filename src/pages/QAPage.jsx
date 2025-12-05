import { useState } from 'react'
import Header from '../components/Header'
import ContextSidebar from '../components/qa/ContextSidebar'
import ChatMessage from '../components/qa/ChatMessage'
import ChatInput from '../components/qa/ChatInput'
import AnswerSection from '../components/qa/AnswerSection'
import ReasoningSteps from '../components/qa/ReasoningSteps'

function QAPage() {
  const [message, setMessage] = useState('')
  const [qaMode, setQaMode] = useState('normal') // 'normal' or 'reasoning'
  const [conversations, setConversations] = useState([
    {
      id: 1,
      question: "What are the key arguments surrounding raising the age of criminal responsibility?",
      timeAgo: "2h ago",
      sourcesCount: 5,
      bgColor: "bg-blue-50",
      hoverColor: "hover:bg-blue-100",
      borderColor: "border-blue-500"
    },
    {
      id: 2,
      question: "How do international standards compare to Queensland's youth justice?",
      timeAgo: "5h ago",
      sourcesCount: 8,
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100",
      borderColor: "border-green-500"
    },
    {
      id: 3,
      question: "What evidence exists for rehabilitation programs effectiveness?",
      timeAgo: "1d ago",
      sourcesCount: 12,
      bgColor: "bg-gray-50",
      hoverColor: "hover:bg-gray-100",
      borderColor: "border-purple-500"
    }
  ])

  const handleSelectConversation = (conversation) => {
    setMessage(conversation.question)
  }

  const handleClearHistory = () => {
    setConversations([])
  }

  const sources = [
    { icon: 'fa-brands fa-reddit', iconColor: 'text-orange-600', name: 'Reddit', score: '4.2', matches: 124, bg: 'bg-blue-50', hover: 'hover:bg-blue-100', scoreBg: 'bg-blue-200 text-blue-800' },
    { icon: 'fa-solid fa-newspaper', iconColor: 'text-gray-700', name: 'News', score: '7.1', matches: 18, bg: 'bg-green-50', hover: 'hover:bg-green-100', scoreBg: 'bg-green-200 text-green-800' },
    { icon: 'fa-solid fa-landmark', iconColor: 'text-indigo-600', name: 'Government Docs', score: '9.0', matches: 6, bg: 'bg-indigo-50', hover: 'hover:bg-indigo-100', scoreBg: 'bg-indigo-200 text-indigo-800' },
    { icon: 'fa-solid fa-gavel', iconColor: 'text-purple-600', name: 'Legal Articles', score: '8.5', matches: 12, bg: 'bg-purple-50', hover: 'hover:bg-purple-100', scoreBg: 'bg-purple-200 text-purple-800' },
    { icon: 'fa-solid fa-flask', iconColor: 'text-yellow-600', name: 'Research Papers', score: '8.9', matches: 4, bg: 'bg-yellow-50', hover: 'hover:bg-yellow-100', scoreBg: 'bg-yellow-200 text-yellow-800' }
  ]

  const highlights = [
    { text: '"UN criticises Queensland youth crime laws as violating children\'s rights..."', source: 'SBS (2024)', score: '0.92', color: 'border-green-500', scoreBg: 'bg-green-100 text-green-800' },
    { text: '"Research shows brain development continues until age 25, affecting decision-making..."', source: 'Nature (2023)', score: '0.89', color: 'border-blue-500', scoreBg: 'bg-blue-100 text-blue-800' },
    { text: '"Queensland Criminal Law Amendment 2024 lowers age to 10 for serious offenses..."', source: 'QLD Legislation', score: '0.95', color: 'border-purple-500', scoreBg: 'bg-purple-100 text-purple-800' }
  ]

  const summary = [
    'The debate centers on raising the criminal responsibility age from 10 to 14, with strong opposition from law enforcement citing public safety concerns.',
    'Supporters emphasize developmental psychology research showing adolescent brain immaturity and advocate for rehabilitation over punishment.',
    'International bodies like the UN have criticized Queensland\'s recent legislative changes as violating children\'s rights.'
  ]

  const answerSections = [
    {
      title: '1. Key Arguments',
      icon: 'fa-balance-scale',
      iconColor: 'text-blue-600',
      items: [
        '<strong>Pro-Raising Age:</strong> Developmental psychology shows brain maturation continues until 25, affecting impulse control and decision-making capacity.',
        '<strong>Against:</strong> Police unions argue that raising the age removes deterrents and endangers community safety, particularly for repeat offenders.',
        '<strong>Indigenous Impact:</strong> Indigenous youth are disproportionately represented in youth detention, raising equity concerns about any policy change.'
      ]
    },
    {
      title: '2. Supporting Evidence',
      icon: 'fa-check-circle',
      iconColor: 'text-green-600',
      items: [
        'UN Committee on the Rights of the Child recommends minimum age of 14 for criminal responsibility globally.',
        'Neuroscience research from Nature (2023) demonstrates prefrontal cortex development lags until early adulthood.',
        'Rehabilitation programs show 40% lower recidivism rates compared to punitive approaches for young offenders.'
      ]
    },
    {
      title: '3. Opposing Evidence',
      icon: 'fa-times-circle',
      iconColor: 'text-red-600',
      items: [
        'Queensland Police data shows 23% increase in youth-related property crimes in areas with reduced enforcement.',
        'Victim advocacy groups argue that age alone shouldn\'t determine accountability for serious violent crimes.',
        'Some communities report feeling unsafe due to perceived lack of consequences for youth offenders.'
      ]
    },
    {
      title: '4. Policy Implications',
      icon: 'fa-clipboard-list',
      iconColor: 'text-purple-600',
      items: [
        'Raising the age requires substantial investment in alternative intervention programs and family support services.',
        'Implementation must address Indigenous over-representation through culturally appropriate justice alternatives.',
        'Community safety concerns require parallel investment in prevention, education, and victim support programs.'
      ]
    }
  ]

  const citations = [
    { icon: 'fa-solid fa-newspaper', iconColor: 'text-gray-700', title: 'SBS News (2024)', desc: 'UN criticises Queensland youth crime laws', reliability: '9.2' },
    { icon: 'fa-solid fa-landmark', iconColor: 'text-indigo-600', title: 'UN Children\'s Rights Committee Report', desc: 'International standards for juvenile justice', reliability: '9.8' },
    { icon: 'fa-brands fa-reddit', iconColor: 'text-orange-600', title: 'Reddit Thread: r/australia', desc: 'Community discussion on youth crime policy (ID 887332)', reliability: '4.5', reliabilityBg: 'bg-yellow-100 text-yellow-800' },
    { icon: 'fa-solid fa-gavel', iconColor: 'text-purple-600', title: 'Queensland Criminal Law Amendment 2024', desc: 'Section 4: Age of criminal responsibility provisions', reliability: '9.5' },
    { icon: 'fa-solid fa-flask', iconColor: 'text-yellow-600', title: 'Nature Journal (2023)', desc: 'Adolescent brain development and decision-making capacity', reliability: '9.7' }
  ]

  const relatedQuestions = [
    { title: 'What are the key legal provisions in Queensland\'s current youth justice system?', desc: 'Understanding the existing framework before considering changes.' },
    { title: 'How do international standards compare to Queensland\'s approach?', desc: 'Benchmarking against global best practices.' },
    { title: 'What are the economic impacts of youth detention programs?', desc: 'Cost-benefit analysis of alternative approaches.' }
  ]

  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      <Header title="Deep Evidence — QA" subtitle="Ask questions. Get evidence-based answers with verifiable sources." />

      <div className="flex max-w-[1400px] mx-auto">
        <ContextSidebar 
          sources={sources} 
          highlights={highlights}
          conversations={conversations}
          onSelectConversation={handleSelectConversation}
          onClearHistory={handleClearHistory}
        />

        <main className="w-[70%] h-[calc(100vh-73px)] flex flex-col bg-gray-100">
          {/* Mode Toggle */}
          <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-gray-700">Mode:</span>
              <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setQaMode('normal')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                    qaMode === 'normal'
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <i className="fa-solid fa-comment-dots mr-2"></i>Normal
                </button>
                <button
                  onClick={() => setQaMode('reasoning')}
                  className={`px-4 py-2 text-sm font-medium rounded-md transition ${
                    qaMode === 'reasoning'
                      ? 'bg-white text-purple-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <i className="fa-solid fa-brain mr-2"></i>Reasoning
                </button>
              </div>
            </div>
            {qaMode === 'reasoning' && (
              <div className="flex items-center gap-2 text-xs text-purple-600 bg-purple-50 px-3 py-1.5 rounded-lg">
                <i className="fa-solid fa-info-circle"></i>
                <span>Showing detailed reasoning steps</span>
              </div>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-8">
            <ChatMessage type="user" content="What are the key arguments and evidence surrounding the debate to raise the age of criminal responsibility in Queensland?" />

            <ChatMessage type="ai">
              {qaMode === 'reasoning' && (
                <ReasoningSteps />
              )}

              <AnswerSection summary={summary} sections={answerSections} citations={citations} />

              {/* Traceability Graph */}
              <div className="mb-4 p-4 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-3 flex items-center">
                  <i className="fa-solid fa-project-diagram mr-2 text-indigo-600"></i>Traceability Graph
                </h3>
                <p className="text-xs text-gray-600 mb-4">Graph auto-generated to show how evidence supports your answer</p>
                <div className="flex items-center justify-between gap-3 text-xs">
                  {['Your Question', 'Key Claims', 'Evidence', 'Sources'].map((step, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <div className="flex-1 bg-white p-3 rounded-lg shadow-sm text-center">
                        <i className={`fa-solid ${['fa-user', 'fa-lightbulb', 'fa-check-circle', 'fa-file-alt'][idx]} ${['text-blue-600', 'text-yellow-600', 'text-green-600', 'text-indigo-600'][idx]} text-lg mb-2`}></i>
                        <p className="font-medium">{step}</p>
                      </div>
                      {idx < 3 && <i className="fa-solid fa-arrow-right text-gray-400"></i>}
                    </div>
                  ))}
                </div>
              </div>

              {/* Counterfactual Box */}
              <div className="mb-4 p-4 bg-purple-50 rounded-lg border border-purple-200">
                <h3 className="text-lg font-semibold text-purple-900 mb-2 flex items-center">
                  <i className="fa-solid fa-random mr-2"></i>Counterfactual Analysis
                </h3>
                <p className="text-sm text-purple-800 mb-3">"What if the law changes...?"</p>
                <button className="px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 transition">
                  <i className="fa-solid fa-magic mr-2"></i>Generate counterfactual analysis
                </button>
              </div>

              {/* Explainability Box */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <h3 className="text-base font-semibold text-gray-900 mb-3 flex items-center">
                  <i className="fa-solid fa-info-circle mr-2 text-blue-600"></i>Why This Answer Was Generated
                </h3>
                <div className="space-y-2 text-xs text-gray-700">
                  <p><strong>Models used:</strong> Sentiment Analysis → Stance Detection → Fact-Checking → Evidence Retrieval</p>
                  <p><strong>Reasoning steps:</strong> Query parsed → 164 documents retrieved → Evidence scored by relevance & reliability → Claims verified against sources → Answer synthesized with citations</p>
                  <p><strong>Limitations:</strong> Reddit data may contain bias; community discussions don't replace legal advice; sentiment analysis accuracy ~87%</p>
                </div>
              </div>
            </ChatMessage>

            {/* Related Questions */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Related Questions</h4>
              <div className="space-y-3">
                {relatedQuestions.map((q, idx) => (
                  <div key={idx} className="p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-600 transition cursor-pointer">
                    <h5 className="font-medium text-gray-900 mb-2">{q.title}</h5>
                    <p className="text-sm text-gray-600">{q.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <ChatInput message={message} setMessage={setMessage} />
        </main>
      </div>
    </div>
  )
}

export default QAPage
