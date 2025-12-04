import { useState, useEffect, useRef } from 'react'
import Plotly from 'plotly.js-dist-min'
import Header from '../components/Header'
import PersonasPanel from '../components/debate/PersonasPanel'
import DebateRound from '../components/debate/DebateRound'
import DebateBubble from '../components/debate/DebateBubble'
import EvidencePanel from '../components/debate/EvidencePanel'
import DebateOutcome from '../components/debate/DebateOutcome'

function DebatePage() {
  const [activeRounds, setActiveRounds] = useState({ round1: true, round2: false, round3: false, round4: false, round5: false })

  const heatmapRef = useRef(null)
  const strengthChartRef = useRef(null)
  const claimEvidenceRef = useRef(null)

  const toggleRound = (roundId) => {
    setActiveRounds(prev => ({ ...prev, [roundId]: !prev[roundId] }))
  }

  const personas = [
    { name: 'Legal Expert', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg', stance: 'Pro', stanceColor: 'bg-blue-600', gradient: 'from-blue-50 to-blue-100', border: 'border-blue-600', desc: 'Focuses on constitutional rights and legal precedents', focus: 'Legal Focus', stars: 5, reliability: '8.7', reliabilityColor: 'text-green-600', status: 'active' },
    { name: 'Criminologist', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg', stance: 'Pro', stanceColor: 'bg-purple-600', gradient: 'from-purple-50 to-purple-100', border: 'border-purple-600', desc: 'Data-driven approach with empirical research', focus: 'Empirical Data', stars: 4, reliability: '9.1', reliabilityColor: 'text-green-600', status: 'active' },
    { name: 'Community Advocate', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg', stance: 'Pro', stanceColor: 'bg-green-600', gradient: 'from-green-50 to-green-100', border: 'border-green-600', desc: 'Emphasizes social justice and community impact', focus: 'Ethical Perspective', stars: 5, reliability: '7.3', reliabilityColor: 'text-yellow-600', status: 'active' },
    { name: 'Conservative Politician', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg', stance: 'Against', stanceColor: 'bg-red-600', gradient: 'from-red-50 to-red-100', border: 'border-red-600', desc: 'Public safety and accountability focused', focus: 'Policy Focus', stars: 3, reliability: '6.8', reliabilityColor: 'text-yellow-600', status: 'active' },
    { name: 'Victim Advocate', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-6.jpg', stance: 'Against', stanceColor: 'bg-orange-600', gradient: 'from-orange-50 to-orange-100', border: 'border-orange-600', desc: "Represents victims' rights and concerns", focus: 'Victim-centered', stars: 4, reliability: '7.5', reliabilityColor: 'text-yellow-600', status: 'silent' },
    { name: 'Psychologist', avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg', stance: 'Neutral', stanceColor: 'bg-gray-600', gradient: 'from-gray-50 to-gray-100', border: 'border-gray-600', desc: 'Developmental psychology and brain science', focus: 'Scientific Basis', stars: 5, reliability: '8.9', reliabilityColor: 'text-green-600', status: 'replying' }
  ]

  const evidences = [
    { id: '[1]', color: 'blue', title: 'UN Convention on Rights of Child', text: '"States Parties recognize the rights of every child alleged as, accused of, or recognized as having infringed the penal law..."', type: 'Legal Document', usedBy: 2, score: '8.5', link: 'un.org/children-rights' },
    { id: '[3]', color: 'purple', title: 'Recidivism Study 2023', text: '"Jurisdictions that raised minimum age showed 35% reduction in youth reoffending rates over 5-year period..."', type: 'Academic Research', usedBy: 1, score: '9.2', link: 'doi.org/10.xxxx' },
    { id: '[4]', color: 'red', title: 'Crime Statistics Report', text: '"Youth crime increased 23% in metropolitan areas over past 18 months according to police data..."', type: 'Government Report', usedBy: 1, score: '6.3', scoreColor: 'bg-yellow-100 text-yellow-800', link: 'police.gov.au/statistics' }
  ]

  const rankings = [
    { rank: 1, name: 'Criminologist', avatar: 'avatar-3.jpg', evidence: '9.1', consistency: '8.8', fairness: '9.0', bg: 'from-yellow-50 to-yellow-100', border: 'border-yellow-200', rankBg: 'bg-yellow-500' },
    { rank: 2, name: 'Psychologist', avatar: 'avatar-8.jpg', evidence: '8.9', consistency: '9.2', fairness: '8.7', bg: 'from-gray-50 to-gray-100', border: 'border-gray-200', rankBg: 'bg-gray-400' },
    { rank: 3, name: 'Legal Expert', avatar: 'avatar-2.jpg', evidence: '8.7', consistency: '8.5', fairness: '8.9', bg: 'from-orange-50 to-orange-100', border: 'border-orange-200', rankBg: 'bg-orange-400' },
    { rank: 4, name: 'Community Advocate', avatar: 'avatar-5.jpg', evidence: '7.3', consistency: '7.8', fairness: '9.1', bg: 'white', border: 'border-gray-200', rankBg: 'bg-gray-300' },
    { rank: 5, name: 'Victim Advocate', avatar: 'avatar-6.jpg', evidence: '7.5', consistency: '7.2', fairness: '7.8', bg: 'white', border: 'border-gray-200', rankBg: 'bg-gray-300' },
    { rank: 6, name: 'Conservative Politician', avatar: 'avatar-4.jpg', evidence: '6.8', consistency: '6.5', fairness: '6.9', bg: 'white', border: 'border-gray-200', rankBg: 'bg-gray-300' }
  ]

  const rounds = [
    { id: 'round1', num: 1, title: 'Opening Statements', gradient: 'from-blue-50 to-blue-100', bg: 'bg-blue-600', status: 'active' },
    { id: 'round2', num: 2, title: 'Rebuttals', gradient: 'from-purple-50 to-purple-100', bg: 'bg-purple-600', status: 'active' },
    { id: 'round3', num: 3, title: 'Evidence Challenges', gradient: 'from-orange-50 to-orange-100', bg: 'bg-orange-600', status: 'in-progress' },
    { id: 'round4', num: 4, title: 'Counterfactual Scenarios', gradient: 'from-teal-50 to-teal-100', bg: 'bg-teal-600', status: 'locked' },
    { id: 'round5', num: 5, title: 'Closing Arguments', gradient: 'from-indigo-50 to-indigo-100', bg: 'bg-indigo-600', status: 'locked' }
  ]

  const round1Bubbles = [
    { avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-2.jpg', name: 'Legal Expert', time: '2 min ago', content: 'Raising the age to 14 aligns with international human rights standards and recognizes developmental neuroscience showing adolescent brain immaturity in decision-making<sup class="text-blue-600 cursor-pointer">[1][2]</sup>. The UN Convention on the Rights of the Child recommends 14 as minimum age.', bgColor: 'bg-blue-50', borderColor: 'border-blue-600', tags: [{ label: 'Evidence-backed', bg: 'bg-green-100', textColor: 'text-green-800' }, { label: 'High confidence', bg: 'bg-blue-100', textColor: 'text-blue-800' }] },
    { avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-3.jpg', name: 'Criminologist', time: '5 min ago', content: 'Empirical data from jurisdictions that raised the age shows reduced recidivism rates by 35%<sup class="text-purple-600 cursor-pointer">[3]</sup>. Youth under 14 in detention facilities experience trauma that increases likelihood of reoffending.', bgColor: 'bg-purple-50', borderColor: 'border-purple-600', tags: [{ label: 'Evidence-backed', bg: 'bg-green-100', textColor: 'text-green-800' }, { label: 'High confidence', bg: 'bg-blue-100', textColor: 'text-blue-800' }] },
    { avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg', name: 'Conservative Politician', time: '8 min ago', content: 'Public safety must be prioritized. Recent crime statistics show youth crime increasing by 23%<sup class="text-red-600 cursor-pointer">[4]</sup>. Communities deserve protection from serious offenders regardless of age.', bgColor: 'bg-red-50', borderColor: 'border-red-600', tags: [{ label: 'Partially verified', bg: 'bg-yellow-100', textColor: 'text-yellow-800' }, { label: 'Medium confidence', bg: 'bg-orange-100', textColor: 'text-orange-800' }] },
    { avatar: 'https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-5.jpg', name: 'Community Advocate', time: '10 min ago', content: 'Indigenous youth are disproportionately affected by current laws, comprising 65% of detained youth under 14<sup class="text-green-600 cursor-pointer">[5]</sup>. This policy change addresses systemic inequality.', bgColor: 'bg-green-50', borderColor: 'border-green-600', tags: [{ label: 'Evidence-backed', bg: 'bg-green-100', textColor: 'text-green-800' }, { label: 'High confidence', bg: 'bg-blue-100', textColor: 'text-blue-800' }] }
  ]

  useEffect(() => {
    if (heatmapRef.current && activeRounds.round1) {
      Plotly.newPlot(heatmapRef.current, [{
        z: [[1.0, 0.8, 0.9, 0.3, 0.4, 0.7], [0.8, 1.0, 0.85, 0.2, 0.3, 0.6], [0.9, 0.85, 1.0, 0.25, 0.35, 0.75], [0.3, 0.2, 0.25, 1.0, 0.8, 0.4], [0.4, 0.3, 0.35, 0.8, 1.0, 0.5], [0.7, 0.6, 0.75, 0.4, 0.5, 1.0]],
        x: ['Legal', 'Criminologist', 'Advocate', 'Politician', 'Victim', 'Psychologist'],
        y: ['Legal', 'Criminologist', 'Advocate', 'Politician', 'Victim', 'Psychologist'],
        type: 'heatmap',
        colorscale: [[0, '#ef4444'], [0.5, '#fbbf24'], [1, '#10b981']],
        showscale: false
      }], { margin: { t: 0, r: 0, b: 60, l: 80 }, plot_bgcolor: '#f9fafb', paper_bgcolor: 'rgba(0,0,0,0)', xaxis: { tickangle: -45 }, yaxis: { autorange: 'reversed' } }, { responsive: true, displayModeBar: false })
    }

    if (strengthChartRef.current) {
      Plotly.newPlot(strengthChartRef.current, [
        { x: ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5'], y: [8.7, 8.8, 8.9, 9.0, 9.1], name: 'Criminologist', type: 'scatter', mode: 'lines+markers', line: { color: '#a855f7', width: 3 } },
        { x: ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5'], y: [8.5, 8.6, 8.7, 8.7, 8.9], name: 'Psychologist', type: 'scatter', mode: 'lines+markers', line: { color: '#64748b', width: 3 } },
        { x: ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5'], y: [8.3, 8.4, 8.5, 8.6, 8.7], name: 'Legal Expert', type: 'scatter', mode: 'lines+markers', line: { color: '#3b82f6', width: 3 } },
        { x: ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5'], y: [7.0, 7.1, 7.2, 7.2, 7.3], name: 'Community Advocate', type: 'scatter', mode: 'lines+markers', line: { color: '#10b981', width: 3 } },
        { x: ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5'], y: [6.5, 6.6, 6.7, 6.8, 6.8], name: 'Conservative Politician', type: 'scatter', mode: 'lines+markers', line: { color: '#ef4444', width: 3 } },
        { x: ['Round 1', 'Round 2', 'Round 3', 'Round 4', 'Round 5'], y: [7.2, 7.3, 7.4, 7.5, 7.5], name: 'Victim Advocate', type: 'scatter', mode: 'lines+markers', line: { color: '#f59e0b', width: 3 } }
      ], { title: 'Argument Strength by Round', yaxis: { title: 'Strength Score', range: [6, 10] }, margin: { t: 60, r: 20, b: 60, l: 60 }, plot_bgcolor: '#f9fafb', paper_bgcolor: 'white', legend: { orientation: 'h', y: -0.2 } }, { responsive: true, displayModeBar: false })
    }

    if (claimEvidenceRef.current) {
      Plotly.newPlot(claimEvidenceRef.current, [{
        x: [0, 1, 2, 1.5, 0.5], y: [0, 1, 1, 2, 2], mode: 'markers+text',
        marker: { size: [40, 30, 30, 25, 25], color: ['#3b82f6', '#10b981', '#a855f7', '#f59e0b', '#ef4444'], line: { width: 2, color: 'white' } },
        text: ['Persona', 'Claim', 'Claim', 'Evidence', 'Evidence'], textposition: 'bottom center', type: 'scatter', showlegend: false
      }], { xaxis: { visible: false, range: [-0.5, 2.5] }, yaxis: { visible: false, range: [-0.5, 2.5] }, margin: { t: 20, r: 20, b: 20, l: 20 }, plot_bgcolor: '#f9fafb', paper_bgcolor: 'rgba(0,0,0,0)', shapes: [{ type: 'line', x0: 0, y0: 0, x1: 1, y1: 1, line: { color: '#cbd5e1', width: 2 } }, { type: 'line', x0: 0, y0: 0, x1: 2, y1: 1, line: { color: '#cbd5e1', width: 2 } }, { type: 'line', x0: 1, y0: 1, x1: 1.5, y1: 2, line: { color: '#cbd5e1', width: 2 } }, { type: 'line', x0: 2, y0: 1, x1: 0.5, y1: 2, line: { color: '#cbd5e1', width: 2 } }] }, { responsive: true, displayModeBar: false })
    }

    return () => {
      [heatmapRef, strengthChartRef, claimEvidenceRef].forEach(ref => { if (ref.current) Plotly.purge(ref.current) })
    }
  }, [activeRounds.round1])

  return (
    <div className="bg-gray-50 min-h-screen">
      <Header 
        title="Deep Evidence – Debate System" 
        subtitle="Multi-persona debates with verifiable evidence and transparent reasoning" 
        maxWidth="max-w-[1600px]"
      />

      <div className="max-w-[1600px] mx-auto px-6 py-8">
        <div className="grid grid-cols-12 gap-6">
          {/* Personas Panel */}
          <div className="col-span-3">
            <PersonasPanel personas={personas} />
          </div>

          {/* Debate Stage */}
          <div className="col-span-6">
            {/* Topic */}
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl shadow-lg p-6 mb-6 text-white">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2 flex items-center">
                    <i className="fa-solid fa-gavel mr-3"></i>Debate Topic
                  </h2>
                  <p className="text-xl text-blue-100">"Should the age of criminal responsibility be raised to 14?"</p>
                </div>
                <button className="px-4 py-2 bg-white text-blue-600 rounded-lg text-sm font-medium hover:bg-blue-50 transition">
                  <i className="fa-solid fa-edit mr-2"></i>Edit Topic
                </button>
              </div>
            </div>

            {/* Rounds */}
            <div className="space-y-4">
              {rounds.map(round => (
                <DebateRound
                  key={round.id}
                  round={round}
                  isActive={activeRounds[round.id]}
                  onToggle={() => toggleRound(round.id)}
                  heatmapRef={round.num === 1 ? heatmapRef : null}
                >
                  {round.num === 1 && round1Bubbles.map((bubble, idx) => (
                    <DebateBubble key={idx} {...bubble} />
                  ))}
                  {round.num === 2 && (
                    <>
                      <DebateBubble
                        avatar="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-4.jpg"
                        name="Conservative Politician"
                        time="Just now"
                        content="While neuroscience is important, it doesn't negate personal responsibility. Young people understand right from wrong."
                        bgColor="bg-red-50"
                        borderColor="border-red-600"
                        tags={[{ label: 'Opinion-based', bg: 'bg-gray-100', textColor: 'text-gray-800' }]}
                      />
                      <DebateBubble
                        avatar="https://storage.googleapis.com/uxpilot-auth.appspot.com/avatars/avatar-8.jpg"
                        name="Psychologist"
                        time="2 min ago"
                        content={'Research shows the prefrontal cortex, responsible for impulse control, isn\'t fully developed until age 25<sup class="text-gray-600 cursor-pointer">[6]</sup>.'}
                        bgColor="bg-gray-50"
                        borderColor="border-gray-600"
                        tags={[{ label: 'Evidence-backed', bg: 'bg-green-100', textColor: 'text-green-800' }, { label: 'High confidence', bg: 'bg-blue-100', textColor: 'text-blue-800' }]}
                      />
                    </>
                  )}
                </DebateRound>
              ))}
            </div>

            {/* Strength Chart */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mt-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Argument Strength Progression</h3>
              <div ref={strengthChartRef} style={{ height: '300px' }}></div>
            </div>

            {/* AI Suggestion */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mt-6 border border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <i className="fa-solid fa-robot text-white"></i>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">AI Suggestion</p>
                  <p className="text-sm text-gray-600">Move to Evidence Challenge round to test the validity of cited sources?</p>
                </div>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition">Accept</button>
              </div>
            </div>
          </div>

          {/* Evidence Panel */}
          <div className="col-span-3">
            <EvidencePanel evidences={evidences} claimEvidenceRef={claimEvidenceRef} />
          </div>
        </div>

        <DebateOutcome rankings={rankings} />
      </div>
    </div>
  )
}

export default DebatePage
