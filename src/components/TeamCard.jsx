
import { Mail } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { getInitials } from '../utils/helpers'

export default function TeamCard({ member }) {
  const navigate = useNavigate()

  return (
    <div className="glass-card flex flex-col items-center text-center relative group animate-fade-in">

      {/* Avatar */}
      <div className="relative mb-3">
        <div
          className="w-16 h-16 rounded-2xl flex items-center justify-center text-white text-xl font-bold shadow-md"
          style={{
            background: `linear-gradient(135deg, ${member.color}cc, ${member.color})`
          }}
        >
          {getInitials(member.name)}
        </div>

        {/* Online Status */}
        <span
          className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-800 ${
            member.online
              ? 'bg-emerald-400'
              : 'bg-slate-300 dark:bg-slate-600'
          }`}
        />
      </div>

      {/* User Info */}
      <h3 className="font-display font-semibold text-sm text-slate-800 dark:text-slate-100">
        {member.name}
      </h3>

      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
        {member.role}
      </p>

      {/* Status Badge */}
      <span
        className={`badge mt-2 text-[10px] ${
          member.online
            ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400'
            : 'bg-slate-100 dark:bg-slate-700/60 text-slate-400'
        }`}
      >
        {member.online ? '● Online' : '○ Offline'}
      </span>

      {/* Actions */}
      <div className="flex gap-2 mt-4 w-full">
        <button
          onClick={() => navigate('/chat')}
          className="flex-1 btn-ghost text-xs py-1.5 flex items-center justify-center gap-1.5"
        >
          <Mail size={13} />
          Message
        </button>
      </div>
    </div>
  )
}

