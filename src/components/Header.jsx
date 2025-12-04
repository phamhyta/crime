import { Link, useLocation } from 'react-router-dom'

function Header({ title, subtitle, maxWidth = 'max-w-7xl' }) {
  const location = useLocation()
  
  const navItems = [
    { path: '/', label: 'Data', icon: 'fa-database' },
    { path: '/analysis', label: 'Analysis', icon: 'fa-chart-line' },
    { path: '/qa', label: 'QA', icon: 'fa-question-circle' },
    { path: '/debate', label: 'Debate System', icon: 'fa-comments' }
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className={`${maxWidth} mx-auto px-6 py-3`}>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
            <p className="text-sm text-gray-600">{subtitle}</p>
          </div>
          <nav className="flex items-center gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 text-sm font-medium rounded-lg transition ${
                  location.pathname === item.path
                    ? 'text-white bg-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <i className={`fa-solid ${item.icon} mr-2`}></i>
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header

