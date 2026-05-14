import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle, Shield, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const [tab,      setTab]      = useState('user')   // 'admin' | 'user'
  const [email,    setEmail]    = useState('')
  const [password, setPassword] = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const { login } = useAuth()
  const navigate  = useNavigate()
  const location  = useLocation()
  const from = location.state?.from?.pathname || '/dashboard'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) { setError('Please fill in all fields.'); return }
    setLoading(true)
    try {
      await login(email, password, tab)
      navigate(from, { replace: true })
    } catch (err) {
      const msgs = {
        'auth/invalid-credential':    'Invalid email or password.',
        'auth/user-not-found':        'No account found with this email.',
        'auth/wrong-password':        'Incorrect password.',
        'auth/too-many-requests':     'Too many attempts. Please try again later.',
        'auth/network-request-failed':'Network error. Check your connection.',
        'auth/not-admin':             'This account does not have admin privileges.',
        'auth/use-admin-login':       'Please use the Admin Login tab for this account.',
      }
      setError(msgs[err.code] || err.message || 'Login failed.')
    } finally {
      setLoading(false)
    }
  }

  const isAdmin = tab === 'admin'

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center px-4">
      <div className="w-full max-w-md animate-slide-up">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center shadow-lg mb-3">
            <span className="text-white font-bold text-xl tracking-tight">OS</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-slate-100">OrionShift</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Sign in to your workspace</p>
        </div>

        <div className="glass rounded-3xl p-8 shadow-xl">

          {/* Tab switcher */}
          <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-6">
            <button
              onClick={() => { setTab('user'); setError('') }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors
                ${!isAdmin ? 'bg-brand-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <User size={15} /> Employee Login
            </button>
            <button
              onClick={() => { setTab('admin'); setError('') }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors
                ${isAdmin ? 'bg-brand-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <Shield size={15} /> Admin Login
            </button>
          </div>

          {isAdmin && (
            <div className="bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/40 text-amber-700 dark:text-amber-400 text-xs px-3 py-2 rounded-xl mb-4 flex items-center gap-2">
              <Shield size={13} className="flex-shrink-0" />
              For CEO, Team Leads, Managers &amp; Executives only.
              <br />Demo: admin@orionshift.com / Admin@2024
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
              <AlertCircle size={15} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@orionshift.com" className="input-field" autoComplete="email" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="input-field pr-10"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full mt-2 flex items-center justify-center gap-2">
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Signing in…</>
                : isAdmin ? 'Sign in as Admin' : 'Sign in'
              }
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Don't have an account?{' '}
            <Link to="/signup" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  )
}