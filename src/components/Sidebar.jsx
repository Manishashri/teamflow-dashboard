
import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  CheckSquare,
  Users,
  Bell,
  LogOut,
  Settings,
  ChevronLeft,
  Zap,
  MessageSquare
} from 'lucide-react'

import { useAuth } from '../context/AuthContext'
import { useNotifications } from '../hooks'
import { getInitials } from '../utils/helpers'

const NAV = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/tasks',     icon: CheckSquare,     label: 'Tasks' },
  { to: '/team',      icon: Users,           label: 'Team' },
  { to: '/chat',      icon: MessageSquare,   label: 'Chat' },
]

export default function Sidebar({ collapsed, setCollapsed }) {
  const { currentUser, userProfile, logout } = useAuth()
  const { unreadCount } = useNotifications()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const name = userProfile?.displayName || currentUser?.displayName || 'You'
  const role = userProfile?.role || 'Team Member'

  return (
    <aside
      className={`fixed top-0 left-0 h-full z-40 flex flex-col glass border-r border-white/60 dark:border-slate-700/50 transition-all duration-300
      ${collapsed ? 'w-[72px]' : 'w-[var(--sidebar-w)]'}`}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-4 py-5 border-b border-slate-100 dark:border-slate-700/50">
        <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center flex-shrink-0 shadow-md">
          <Zap size={16} className="text-white" strokeWidth={2.5} />
        </div>

        {!collapsed && (
          <span className="font-display font-bold text-lg text-brand-700 dark:text-brand-300 tracking-tight">
            TeamFlow
          </span>
        )}

        <button
          onClick={() => setCollapsed(c => !c)}
          className="ml-auto text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 transition-colors hidden lg:flex"
          title="Toggle sidebar"
        >
          <ChevronLeft
            size={18}
            className={`transition-transform duration-300 ${
              collapsed ? 'rotate-180' : ''
            }`}
          />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-1 overflow-y-auto">
        {NAV.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `nav-item ${isActive ? 'active' : ''} ${
                collapsed ? 'justify-center px-2' : ''
              }`
            }
            title={collapsed ? label : undefined}
          >
            <Icon size={18} />
            {!collapsed && <span>{label}</span>}
          </NavLink>
        ))}

        {/* Notifications */}
        <div
          className={`nav-item relative ${
            collapsed ? 'justify-center px-2' : ''
          }`}
          title={collapsed ? 'Notifications' : undefined}
        >
          <Bell size={18} />

          {!collapsed && <span>Notifications</span>}

          {unreadCount > 0 && (
            <span
              className={`absolute ${
                collapsed ? 'top-1 right-1' : 'right-3'
              } bg-red-500 text-white text-[10px] font-bold min-w-[18px] h-[18px] rounded-full flex items-center justify-center px-1`}
            >
              {unreadCount}
            </span>
          )}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="px-2 py-3 border-t border-slate-100 dark:border-slate-700/50 space-y-1">
        <button
          className={`nav-item w-full ${
            collapsed ? 'justify-center px-2' : ''
          }`}
          title={collapsed ? 'Settings' : undefined}
        >
          <Settings size={18} />
          {!collapsed && <span>Settings</span>}
        </button>

        <button
          onClick={handleLogout}
          className={`nav-item w-full text-red-500 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:text-red-600 ${
            collapsed ? 'justify-center px-2' : ''
          }`}
          title={collapsed ? 'Logout' : undefined}
        >
          <LogOut size={18} />
          {!collapsed && <span>Logout</span>}
        </button>

        {/* User Info */}
        {!collapsed && (
          <div className="flex items-center gap-2.5 px-3 py-2.5 mt-2 rounded-xl bg-slate-50 dark:bg-slate-800/60">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-400 to-brand-700 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {getInitials(name)}
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-700 dark:text-slate-200 truncate">
                {name}
              </p>

              <p className="text-[10px] text-slate-400 dark:text-slate-500 truncate">
                {role}
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
  )
}

