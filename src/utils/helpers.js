// ─── Priority helpers ─────────────────────────────────────────────────────────
export const PRIORITY_CONFIG = {
  low:    { label: 'Low',    bg: 'bg-slate-100 dark:bg-slate-700/60',  text: 'text-slate-500 dark:text-slate-400',  dot: 'bg-slate-400'  },
  medium: { label: 'Medium', bg: 'bg-amber-50  dark:bg-amber-900/20',  text: 'text-amber-600 dark:text-amber-400',  dot: 'bg-amber-400'  },
  high:   { label: 'High',   bg: 'bg-orange-50 dark:bg-orange-900/20', text: 'text-orange-600 dark:text-orange-400',dot: 'bg-orange-400' },
  urgent: { label: 'Urgent', bg: 'bg-red-50    dark:bg-red-900/20',    text: 'text-red-600   dark:text-red-400',    dot: 'bg-red-500'    },
}

export const STATUS_CONFIG = {
  todo:        { label: 'To Do',       bg: 'bg-slate-100 dark:bg-slate-700/60', text: 'text-slate-600 dark:text-slate-300', border: 'border-slate-300 dark:border-slate-600' },
  in_progress: { label: 'In Progress', bg: 'bg-brand-50  dark:bg-brand-900/30', text: 'text-brand-600 dark:text-brand-400', border: 'border-brand-300 dark:border-brand-700' },
  completed:   { label: 'Completed',   bg: 'bg-emerald-50 dark:bg-emerald-900/20', text: 'text-emerald-600 dark:text-emerald-400', border: 'border-emerald-300 dark:border-emerald-700' },
}

// ─── Date helpers ─────────────────────────────────────────────────────────────
export function formatDate(dateStr) {
  if (!dateStr) return '—'
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function daysUntil(dateStr) {
  if (!dateStr) return null
  const diff = new Date(dateStr) - new Date()
  return Math.ceil(diff / (1000 * 60 * 60 * 24))
}

export function isDueSoon(dateStr) {
  const d = daysUntil(dateStr)
  return d !== null && d >= 0 && d <= 3
}

export function isOverdue(dateStr) {
  const d = daysUntil(dateStr)
  return d !== null && d < 0
}

// ─── Avatar helpers ───────────────────────────────────────────────────────────
export function getInitials(name = '') {
  return name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2)
}

// ─── Task statistics ──────────────────────────────────────────────────────────
export function getTaskStats(tasks) {
  return {
    total:       tasks.length,
    todo:        tasks.filter(t => t.status === 'todo').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    completed:   tasks.filter(t => t.status === 'completed').length,
    completionRate: tasks.length
      ? Math.round((tasks.filter(t => t.status === 'completed').length / tasks.length) * 100)
      : 0,
  }
}

// ─── Notification type colors ─────────────────────────────────────────────────
export const NOTIF_CONFIG = {
  mention:  { bg: 'bg-brand-100  dark:bg-brand-900/30',   text: 'text-brand-600  dark:text-brand-400'   },
  task:     { bg: 'bg-purple-100 dark:bg-purple-900/30',  text: 'text-purple-600 dark:text-purple-400'  },
  deadline: { bg: 'bg-orange-100 dark:bg-orange-900/20',  text: 'text-orange-600 dark:text-orange-400'  },
  complete: { bg: 'bg-emerald-100 dark:bg-emerald-900/20',text: 'text-emerald-600 dark:text-emerald-400' },
  team:     { bg: 'bg-slate-100  dark:bg-slate-700/60',   text: 'text-slate-600  dark:text-slate-300'   },
}

// ─── Class merge helper (tiny) ────────────────────────────────────────────────
export function cx(...classes) {
  return classes.filter(Boolean).join(' ')
}
