function AnswerSection({ summary, sections, citations }) {
  return (
    <div>
      {/* Summary Answer */}
      <div className="mb-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg">
        <h3 className="text-lg font-semibold text-blue-900 mb-3 flex items-center">
          <i className="fa-solid fa-lightbulb mr-2"></i>Summary Answer
        </h3>
        <ul className="space-y-2 text-sm text-blue-900">
          {summary.map((item, idx) => (
            <li key={idx} className="flex items-start">
              <i className="fa-solid fa-circle text-xs mr-2 mt-1.5"></i>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Evidence-Based Answer */}
      <div className="mb-4">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Evidence-Based Answer</h3>
        {sections.map((section, idx) => (
          <div key={idx} className="mb-5">
            <h4 className="text-base font-semibold text-gray-800 mb-3 flex items-center">
              <i className={`fa-solid ${section.icon} ${section.iconColor} mr-2`}></i>
              {section.title}
            </h4>
            <ul className="space-y-2 text-sm text-gray-700 pl-6">
              {section.items.map((item, itemIdx) => (
                <li key={itemIdx} className="flex items-start">
                  <i className={`fa-solid fa-chevron-right ${section.iconColor} text-xs mr-2 mt-1`}></i>
                  <span dangerouslySetInnerHTML={{ __html: item }}></span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Citations */}
      <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <i className="fa-solid fa-bookmark mr-2 text-blue-600"></i>
          Sources Used
        </h3>
        <div className="space-y-3">
          {citations.map((source, idx) => (
            <div key={idx} className="flex items-start gap-3 p-3 bg-white rounded-lg border border-gray-100 hover:border-blue-600 transition cursor-pointer">
              <i className={`${source.icon} ${source.iconColor} text-lg mt-1`}></i>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">{source.title}</p>
                <p className="text-xs text-gray-600 mt-1">{source.desc}</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs px-2 py-1 rounded ${source.reliabilityBg || 'bg-green-100 text-green-800'}`}>
                    Reliability: {source.reliability}
                  </span>
                  <a href="#" className="text-xs text-blue-600 hover:underline">View source</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AnswerSection

