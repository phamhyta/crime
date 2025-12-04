import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import '@fortawesome/fontawesome-free/css/all.min.css'
import DataPage from './pages/DataPage'
import AnalysisPage from './pages/AnalysisPage'
import QAPage from './pages/QAPage'
import DebatePage from './pages/DebatePage'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DataPage />} />
        <Route path="/analysis" element={<AnalysisPage />} />
        <Route path="/qa" element={<QAPage />} />
        <Route path="/debate" element={<DebatePage />} />
      </Routes>
    </Router>
  )
}

export default App
