import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import { ThemeProvider } from './contexts/ThemeContext'
import { AlertLogsPage } from './pages/AlertLogsPage'
import { ConnectedServersPage } from './pages/ConnectedServersPage'
import { CVEScannerPage } from './pages/CVEScannerPage'
import { DashboardPage } from './pages/DashboardPage'
import { SettingsPage } from './pages/SettingsPage'

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<DashboardPage />} />
            <Route path="/servers" element={<ConnectedServersPage />} />
            <Route path="/cve-scanner" element={<CVEScannerPage />} />
            <Route path="/alerts" element={<AlertLogsPage />} />
            <Route path="/settings" element={<SettingsPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </ThemeProvider>
  )
}
