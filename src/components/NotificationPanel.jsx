import { Bell, X, Check, CheckCheck } from 'lucide-react'
import { useNotifications } from '../hooks'
import { NOTIF_CONFIG } from '../utils/helpers'

export default function NotificationPanel({ onClose }) {
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications()

  return (
    <div className="glass rounded-2xl shadow-xl border border-white/80 dark:border-slate-700/60 overflow-hidden animate-slide-up">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 dark:border-slate-700/50">
        <div className="flex items-center gap-2">
          <Bell size={15} className="text-brand-500" />
          <span className="font-display font-semibold text-sm text-slate-800 dark:text-slate-100">Notifications</span>
          {unreadCount > 0 && (
            <span className="badge bg-brand-100 dark:bg-brand-900/40 text-brand-600 dark:text-brand-400 text-[10px]">
              {unreadCount}
            </span>
          )}
        </div>
        <div className="flex items-center gap-1">
          {unreadCount > 0 && (
            <button onClick={markAllRead} className="btn-ghost py-1 px-2 text-xs flex items-center gap-1">
              <CheckCheck size={13} /> All read
            </button>
          )}
          <button onClick={onClose} className="btn-ghost p-1.5">
            <X size={15} />
          </button>
        </div>
      </div>

      {/* List */}
      <div className="max-h-80 overflow-y-auto divide-y divide-slate-50 dark:divide-slate-700/30">
        {notifications.length === 0 ? (
          <p className="text-sm text-slate-400 text-center py-10">All caught up!</p>
        ) : (
          notifications.map(n => {
            const cfg = NOTIF_CONFIG[n.type] || NOTIF_CONFIG.team
            return (
              <div
                key={n.id}
                className={`px-4 py-3 flex gap-3 transition-colors ${!n.read ? 'bg-brand-50/40 dark:bg-brand-900/10' : ''} hover:bg-slate-50 dark:hover:bg-slate-700/30 cursor-pointer`}
                onClick={() => markRead(n.id)}
              >
                <div className={`w-2 h-2 rounded-full mt-1.5 flex-shrink-0 ${!n.read ? 'bg-brand-500' : 'bg-transparent'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">{n.message}</p>
                  <p className="text-[10px] text-slate-400 mt-1">{n.time}</p>
                </div>
                {!n.read && (
                  <button onClick={e => { e.stopPropagation(); markRead(n.id) }} className="btn-ghost p-1 self-center flex-shrink-0">
                    <Check size={12} />
                  </button>
                )}
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
