import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'

function Header({ title, subtitle, maxWidth = 'max-w-7xl' }) {
  const location = useLocation()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const navItems = [
    { path: '/', label: 'Data', icon: 'fa-database' },
    { path: '/analysis', label: 'Analysis', icon: 'fa-chart-line' },
    { path: '/qa', label: 'QA', icon: 'fa-question-circle' },
    { path: '/debate', label: 'Debate System', icon: 'fa-comments' }
  ]

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
      <div className={`${maxWidth} mx-auto px-4 sm:px-6 py-3`}>
        <div className="flex items-center justify-between">
          {/* Title Section */}
          <div className="flex-1 min-w-0">
            <h1 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 truncate">{title}</h1>
            <p className="text-xs sm:text-sm text-gray-600 truncate hidden sm:block">{subtitle}</p>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-2 lg:gap-4">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-2 lg:px-3 py-2 text-xs lg:text-sm font-medium rounded-lg transition ${
                  location.pathname === item.path
                    ? 'text-white bg-blue-600'
                    : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                }`}
              >
                <i className={`fa-solid ${item.icon} lg:mr-2`}></i>
                <span className="hidden lg:inline">{item.label}</span>
              </Link>
            ))}
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 text-gray-700 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition"
            aria-label="Toggle menu"
          >
            <i className={`fa-solid ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'} text-xl`}></i>
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-2 border-t border-gray-200 pt-4">
            <div className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`px-4 py-2 text-sm font-medium rounded-lg transition ${
                    location.pathname === item.path
                      ? 'text-white bg-blue-600'
                      : 'text-gray-700 hover:text-blue-600 hover:bg-gray-50'
                  }`}
                >
                  <i className={`fa-solid ${item.icon} mr-2`}></i>
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}

export default Header

