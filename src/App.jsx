import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider }  from './context/AuthContext'
import { ThemeProvider } from './context/ThemeContext'
import ProtectedRoute    from './components/ProtectedRoute'
import AppLayout         from './pages/AppLayout'
import Login             from './pages/Login'
import Signup            from './pages/Signup'
import Dashboard         from './pages/Dashboard'
import Tasks             from './pages/Tasks'
import Team              from './pages/Team'
import Chat from './pages/Chat'
export default function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <Routes>
            {/* Public routes */}
            <Route path="/login"  element={<Login  />} />
            <Route path="/signup" element={<Signup />} />

            {/* Protected app shell */}
            <Route path="/" element={
              <ProtectedRoute>
                <AppLayout />
              </ProtectedRoute>
            }>
              <Route index             element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard"  element={<Dashboard />} />
              <Route path="tasks"      element={<Tasks     />} />
              <Route path="team"       element={<Team      />} />
              <Route path="chat" element={<Chat />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  )
}
