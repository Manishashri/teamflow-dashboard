import { TrendingUp, TrendingDown, Minus } from 'lucide-react'

export default function ProgressCard({ label, value, change, positive, icon: Icon, color = 'brand' }) {
  const colors = {
    brand:   { bg: 'from-brand-400   to-brand-600',   light: 'bg-brand-50   dark:bg-brand-900/20',   text: 'text-brand-600   dark:text-brand-400'   },
    purple:  { bg: 'from-purple-400  to-purple-600',  light: 'bg-purple-50  dark:bg-purple-900/20',  text: 'text-purple-600  dark:text-purple-400'  },
    emerald: { bg: 'from-emerald-400 to-emerald-600', light: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400' },
    amber:   { bg: 'from-amber-400   to-amber-600',   light: 'bg-amber-50   dark:bg-amber-900/20',   text: 'text-amber-600   dark:text-amber-400'   },
  }
  const c = colors[color] || colors.brand
  const ChangeIcon = positive === true ? TrendingUp : positive === false ? TrendingDown : Minus

  return (
    <div className="glass-card flex items-center gap-4">
      {Icon && (
        <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${c.bg} flex items-center justify-center flex-shrink-0 shadow-md`}>
          <Icon size={20} className="text-white" />
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 dark:text-slate-400 font-medium truncate">{label}</p>
        <div className="flex items-end gap-2">
          <span className="font-display font-bold text-2xl text-slate-800 dark:text-slate-100">{value}</span>
          {change && (
            <span className={`flex items-center gap-0.5 text-xs font-semibold mb-0.5 ${positive === true ? 'text-emerald-500' : positive === false ? 'text-red-500' : 'text-slate-400'}`}>
              <ChangeIcon size={12} /> {change}
            </span>
          )}
        </div>
      </div>
    </div>
  )
}
