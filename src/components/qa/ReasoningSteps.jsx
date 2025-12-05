function ReasoningSteps({ steps = [] }) {
  const defaultSteps = [
    {
      step: 1,
      title: 'Query Analysis',
      description: 'Phân tích câu hỏi để xác định các khái niệm chính, entities, và intent',
      details: [
        'Xác định keywords: "age of criminal responsibility", "Queensland", "raise"',
        'Phân loại intent: Policy analysis và Evidence gathering',
        'Xác định scope: Juvenile justice system, legal framework'
      ],
      icon: 'fa-search',
      color: 'blue'
    },
    {
      step: 2,
      title: 'Document Retrieval',
      description: 'Tìm kiếm và lấy về các tài liệu liên quan từ database',
      details: [
        '164 documents được tìm thấy từ các nguồn: Legal, News, Research Papers',
        'Relevance scoring: Top 20 documents có score > 0.85',
        'Source diversity: Đảm bảo đa dạng nguồn (Government, Academic, News)'
      ],
      icon: 'fa-database',
      color: 'green'
    },
    {
      step: 3,
      title: 'Evidence Extraction',
      description: 'Trích xuất các bằng chứng cụ thể từ các tài liệu',
      details: [
        'Extract key claims về age requirements từ legal documents',
        'Extract statistical data về recidivism rates từ research papers',
        'Extract policy positions từ government reports và news articles'
      ],
      icon: 'fa-file-alt',
      color: 'purple'
    },
    {
      step: 4,
      title: 'Sentiment & Stance Analysis',
      description: 'Phân tích sentiment và stance của các bằng chứng',
      details: [
        'Sentiment analysis: Positive (pro-reform) vs Negative (against)',
        'Stance detection: Identify arguments supporting và opposing views',
        'Confidence scoring: High (0.9+) vs Medium (0.7-0.9) vs Low (<0.7)'
      ],
      icon: 'fa-brain',
      color: 'indigo'
    },
    {
      step: 5,
      title: 'Fact Verification',
      description: 'Xác minh tính chính xác của các claims',
      details: [
        'Cross-reference claims với multiple sources',
        'Verify statistics từ official government databases',
        'Check citation validity và source reliability scores'
      ],
      icon: 'fa-check-double',
      color: 'green'
    },
    {
      step: 6,
      title: 'Answer Synthesis',
      description: 'Tổng hợp thông tin để tạo câu trả lời hoàn chỉnh',
      details: [
        'Organize evidence theo categories: Arguments, Supporting Evidence, Opposing Evidence',
        'Synthesize balanced answer với multiple perspectives',
        'Include citations và reliability scores cho transparency'
      ],
      icon: 'fa-puzzle-piece',
      color: 'orange'
    }
  ]

  const displaySteps = steps.length > 0 ? steps : defaultSteps

  const colorClasses = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-500', text: 'text-blue-600', iconBg: 'bg-blue-100' },
    green: { bg: 'bg-green-50', border: 'border-green-500', text: 'text-green-600', iconBg: 'bg-green-100' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-500', text: 'text-purple-600', iconBg: 'bg-purple-100' },
    indigo: { bg: 'bg-indigo-50', border: 'border-indigo-500', text: 'text-indigo-600', iconBg: 'bg-indigo-100' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-500', text: 'text-orange-600', iconBg: 'bg-orange-100' }
  }

  return (
    <div className="mb-4">
      <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
        <i className="fa-solid fa-route mr-2 text-purple-600"></i>Reasoning Steps
      </h3>
      
      <div className="space-y-4 relative">
        {displaySteps.map((step, idx) => {
          const colors = colorClasses[step.color] || colorClasses.blue
          return (
            <div key={idx} className="relative">
              {/* Connecting Line */}
              {idx < displaySteps.length - 1 && (
                <div className="absolute left-6 top-12 w-0.5 bg-gray-300 opacity-30" style={{ height: 'calc(100% + 1rem)', top: '48px' }}></div>
              )}
              
              <div className={`relative ${colors.bg} rounded-lg p-4 border-l-4 ${colors.border}`}>
                <div className="flex items-start gap-4">
                  {/* Step Number */}
                  <div className={`${colors.iconBg} ${colors.text} w-12 h-12 rounded-lg flex items-center justify-center font-bold text-lg flex-shrink-0 relative z-10`}>
                    {step.step || idx + 1}
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <i className={`fa-solid ${step.icon} ${colors.text}`}></i>
                      <h4 className="text-base font-semibold text-gray-900">{step.title}</h4>
                    </div>
                    <p className="text-sm text-gray-700 mb-3">{step.description}</p>
                    
                    {/* Details */}
                    {step.details && step.details.length > 0 && (
                      <ul className="space-y-2 ml-6">
                        {step.details.map((detail, detailIdx) => (
                          <li key={detailIdx} className="text-xs text-gray-600 flex items-start">
                            <i className={`fa-solid fa-circle ${colors.text} text-xs mr-2 mt-1.5`}></i>
                            <span>{detail}</span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ReasoningSteps

