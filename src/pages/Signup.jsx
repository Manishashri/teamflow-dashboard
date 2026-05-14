import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Eye, EyeOff, AlertCircle, Shield, User } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { ADMIN_ROLES } from '../data/mockData'

const ALL_ROLES = [
  { group: 'Admin / Leadership', roles: ['CEO', 'CTO', 'VP', 'Manager', 'Team Lead'] },
  { group: 'Employees',          roles: ['Frontend Dev', 'Backend Dev', 'DevOps', 'UI Designer', 'QA Engineer', 'Product Designer', 'Engineer', 'Developer'] },
]

export default function Signup() {
  const [tab,      setTab]      = useState('user')
  const [name,     setName]     = useState('')
  const [email,    setEmail]    = useState('')
  const [role,     setRole]     = useState('Engineer')
  const [password, setPassword] = useState('')
  const [confirm,  setConfirm]  = useState('')
  const [showPw,   setShowPw]   = useState(false)
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState('')

  const { signup } = useAuth()
  const navigate   = useNavigate()

  const isAdminTab = tab === 'admin'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!name || !email || !password || !confirm) { setError('Please fill in all fields.'); return }
    if (password !== confirm) { setError('Passwords do not match.'); return }
    if (password.length < 6)  { setError('Password must be at least 6 characters.'); return }

    // Validate role matches tab
    const roleIsAdmin = ADMIN_ROLES.includes(role)
    if (isAdminTab && !roleIsAdmin) {
      setError('Please select a leadership role for admin registration.')
      return
    }
    if (!isAdminTab && roleIsAdmin) {
      setError('This role requires admin registration. Switch to Admin tab.')
      return
    }

    setLoading(true)
    try {
      await signup(email, password, name, role)
      navigate('/dashboard')
    } catch (err) {
      const msgs = {
        'auth/email-already-in-use':  'An account with this email already exists.',
        'auth/invalid-email':         'Please enter a valid email address.',
        'auth/weak-password':         'Password should be at least 6 characters.',
        'auth/network-request-failed':'Network error. Check your connection.',
      }
      setError(msgs[err.code] || err.message || 'Signup failed.')
    } finally {
      setLoading(false)
    }
  }

  const rolesForTab = isAdminTab
    ? ALL_ROLES.filter(g => g.group === 'Admin / Leadership')
    : ALL_ROLES.filter(g => g.group === 'Employees')

  return (
    <div className="min-h-screen bg-mesh flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-md animate-slide-up">

        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center shadow-lg mb-3">
            <span className="text-white font-bold text-xl tracking-tight">OS</span>
          </div>
          <h1 className="font-display font-bold text-2xl text-slate-800 dark:text-slate-100">Join OrionShift</h1>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">Create your account</p>
        </div>

        <div className="glass rounded-3xl p-8 shadow-xl">

          {/* Tab switcher */}
          <div className="flex rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 mb-6">
            <button
              onClick={() => { setTab('user'); setRole('Engineer'); setError('') }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors
                ${!isAdminTab ? 'bg-brand-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <User size={15} /> Employee
            </button>
            <button
              onClick={() => { setTab('admin'); setRole('Team Lead'); setError('') }}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-semibold transition-colors
                ${isAdminTab ? 'bg-brand-600 text-white' : 'text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800'}`}
            >
              <Shield size={15} /> Admin
            </button>
          </div>

          {error && (
            <div className="flex items-center gap-2 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800/40 text-red-600 dark:text-red-400 text-sm px-4 py-3 rounded-xl mb-5">
              <AlertCircle size={15} className="flex-shrink-0" />
              {error}
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="Your name" className="input-field" autoComplete="name" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@orionshift.com" className="input-field" autoComplete="email" />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Role</label>
              <select value={role} onChange={e => setRole(e.target.value)} className="input-field text-sm">
                {rolesForTab.map(group => (
                  <optgroup key={group.group} label={group.group}>
                    {group.roles.map(r => <option key={r} value={r}>{r}</option>)}
                  </optgroup>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  placeholder="Min. 6 characters"
                  className="input-field pr-10"
                  autoComplete="new-password"
                />
                <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-600 dark:text-slate-300 mb-1.5">Confirm Password</label>
              <input type="password" value={confirm} onChange={e => setConfirm(e.target.value)} placeholder="Repeat password" className="input-field" autoComplete="new-password" />
            </div>

            <button onClick={handleSubmit} disabled={loading} className="btn-primary w-full mt-2 flex items-center justify-center gap-2">
              {loading
                ? <><div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" /> Creating account…</>
                : 'Create account'
              }
            </button>
          </div>

          <p className="text-center text-sm text-slate-500 dark:text-slate-400 mt-6">
            Already have an account?{' '}
            <Link to="/login" className="text-brand-600 dark:text-brand-400 font-semibold hover:underline">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  )
}
