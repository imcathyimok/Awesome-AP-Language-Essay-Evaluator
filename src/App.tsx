import { HashRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppLayout } from './components/AppLayout'
import { AboutPage } from './pages/AboutPage'
import { CustomPage } from './pages/CustomPage'
import { DashboardPage } from './pages/DashboardPage'
import { PracticeIndexPage } from './pages/PracticeIndexPage'
import { PracticePromptPage } from './pages/PracticePromptPage'
import { ResultsPage } from './pages/ResultsPage'

export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
          <Route path="/practice" element={<PracticeIndexPage />} />
          <Route path="/practice/:promptId" element={<PracticePromptPage />} />
          <Route path="/custom" element={<CustomPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/results/:submissionId" element={<ResultsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </HashRouter>
  )
}
