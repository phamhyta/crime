function FilterBar() {
  const filters = [
    { options: ['30 days', '7 days', '90 days', 'Custom'] },
    { options: ['Reddit', 'News (Coming soon)', 'Legal docs (Coming soon)', 'Academic (Coming soon)'], disabledFrom: 1 },
    { options: ['All Topics', 'Raise age of criminal responsibility', 'Youth detention', 'Rehabilitation vs punishment', 'Adult sentencing for youth'] },
    { options: ['All Regions', 'Australia', 'United States', 'United Kingdom'] },
    { options: ['All Content', 'Posts Only', 'Comments Only', 'Evidence-linked Posts', 'Debate-heavy Threads'] },
    { options: ['All Sentiments', 'Positive', 'Neutral', 'Negative'] },
    { options: ['All Stances', 'Pro', 'Neutral', 'Against'] }
  ]

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-gray-700 flex items-center">
          <i className="fa-solid fa-filter mr-2 text-blue-600"></i>Filters
        </h3>
        <button className="px-3 py-1.5 text-xs text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition">
          <i className="fa-solid fa-rotate-left mr-1"></i>Reset
        </button>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3">
        {filters.map((filter, idx) => (
          <select
            key={idx}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-600 focus:border-blue-600 bg-white"
          >
            {filter.options.map((option, optIdx) => (
              <option key={optIdx} disabled={filter.disabledFrom !== undefined && optIdx >= filter.disabledFrom}>
                {option}
              </option>
            ))}
          </select>
        ))}
      </div>
    </div>
  )
}

export default FilterBar

