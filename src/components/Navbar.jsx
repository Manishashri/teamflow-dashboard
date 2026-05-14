import { useState } from 'react'
import { Search, Sun, Moon, Bell, Menu } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useNotifications } from '../hooks'
import NotificationPanel from './NotificationPanel'

export default function Navbar({ onMenuClick, pageTitle }) {
  const { theme, toggleTheme } = useTheme()
  const { unreadCount } = useNotifications()
  const [showNotifs, setShowNotifs] = useState(false)
  const [search, setSearch] = useState('')

  return (
    <header className="sticky top-0 z-30 glass border-b border-white/60 dark:border-slate-700/50 h-16 flex items-center px-4 gap-4">
      {/* Mobile menu toggle */}
      <button onClick={onMenuClick} className="lg:hidden btn-ghost p-2">
        <Menu size={20} />
      </button>

      {/* Page title */}
      <h1 className="font-display font-semibold text-lg text-slate-800 dark:text-slate-100 hidden sm:block">
        {pageTitle}
      </h1>

      {/* Search */}
      <div className="flex-1 max-w-sm mx-auto lg:mx-0 lg:ml-4">
        <div className="relative">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search tasks…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="input-field pl-9 py-2 text-sm h-9"
          />
        </div>
      </div>

      <div className="flex items-center gap-1 ml-auto">
        {/* Theme toggle */}
        <button onClick={toggleTheme} className="btn-ghost p-2 rounded-xl" title="Toggle theme">
          {theme === 'dark'
            ? <Sun  size={18} className="text-amber-400" />
            : <Moon size={18} className="text-brand-500" />
          }
        </button>

        {/* Notifications bell */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(v => !v)}
            className="btn-ghost p-2 rounded-xl relative"
            title="Notifications"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </button>

          {showNotifs && (
            <div className="absolute right-0 top-full mt-2 w-80 z-50">
              <NotificationPanel onClose={() => setShowNotifs(false)} />
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
