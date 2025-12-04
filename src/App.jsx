import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import AnalysisPage from './pages/AnalysisPage'
import QAPage from './pages/QAPage'
import DebatePage from './pages/DebatePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnalysisPage />} />
        <Route path="/qa" element={<QAPage />} />
        <Route path="/debate" element={<DebatePage />} />
      </Routes>
    </Router>
  )
}

export default App
