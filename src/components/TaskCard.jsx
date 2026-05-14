import { useState } from 'react'
import { MoreVertical, Trash2, Edit2, Calendar, CheckCircle2, Clock, Circle } from 'lucide-react'
import { PRIORITY_CONFIG, STATUS_CONFIG, formatDate, isDueSoon, isOverdue, getInitials, cx } from '../utils/helpers'
import { MOCK_USERS } from '../data/mockData'

export default function TaskCard({ task, onUpdate, onDelete, members = MOCK_USERS }) {
  const [showMenu, setShowMenu] = useState(false)

  const priority = PRIORITY_CONFIG[task.priority] || PRIORITY_CONFIG.low
  const status   = STATUS_CONFIG[task.status]     || STATUS_CONFIG.todo

  const assignedMembers = members.filter(m => task.assignedTo?.includes(m.id))
  const dueSoon  = isDueSoon(task.dueDate)
  const overdue  = isOverdue(task.dueDate)

  const StatusIcon = task.status === 'completed' ? CheckCircle2
    : task.status === 'in_progress' ? Clock
    : Circle

  const cycleStatus = () => {
    const cycle = { todo: 'in_progress', in_progress: 'completed', completed: 'todo' }
    onUpdate?.(task.id, { status: cycle[task.status], progress: cycle[task.status] === 'completed' ? 100 : task.progress })
  }

  return (
    <div className="glass-card group relative animate-fade-in">
      {/* Priority dot */}
      <div className={`absolute top-4 left-4 w-2 h-2 rounded-full ${priority.dot}`} />

      {/* Header */}
      <div className="flex items-start justify-between gap-2 pl-5">
        <div className="flex-1 min-w-0">
          <h3 className={`font-display font-semibold text-sm leading-snug ${task.status === 'completed' ? 'line-through text-slate-400' : 'text-slate-800 dark:text-slate-100'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">{task.description}</p>
          )}
        </div>

        {/* More menu */}
        <div className="relative flex-shrink-0">
          <button
            onClick={() => setShowMenu(v => !v)}
            className="opacity-0 group-hover:opacity-100 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-400 transition-all"
          >
            <MoreVertical size={15} />
          </button>

          {showMenu && (
            <div className="absolute right-0 top-full mt-1 glass rounded-xl shadow-lg py-1 w-36 z-10">
              <button onClick={() => { setShowMenu(false) }} className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-slate-50 dark:hover:bg-slate-700/50 w-full text-left text-slate-600 dark:text-slate-300">
                <Edit2 size={13} /> Edit task
              </button>
              <button onClick={() => { onDelete?.(task.id); setShowMenu(false) }} className="flex items-center gap-2 px-3 py-2 text-xs hover:bg-red-50 dark:hover:bg-red-900/20 w-full text-left text-red-500">
                <Trash2 size={13} /> Delete
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tags */}
      {task.tags?.length > 0 && (
        <div className="flex flex-wrap gap-1.5 mt-3">
          {task.tags.map(tag => (
            <span key={tag} className="badge bg-slate-100 dark:bg-slate-700/60 text-slate-500 dark:text-slate-400 text-[10px]">
              #{tag}
            </span>
          ))}
        </div>
      )}

      {/* Progress bar */}
      {task.status === 'in_progress' && (
        <div className="mt-3">
          <div className="flex justify-between text-[10px] text-slate-400 mb-1">
            <span>Progress</span>
            <span>{task.progress ?? 0}%</span>
          </div>
          <div className="h-1.5 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-brand-400 to-brand-600 rounded-full transition-all duration-500"
              style={{ width: `${task.progress ?? 0}%` }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/50">
        {/* Avatars */}
        <div className="flex -space-x-2">
          {assignedMembers.slice(0, 3).map(m => (
            <div
              key={m.id}
              title={m.name}
              className="w-6 h-6 rounded-full border-2 border-white dark:border-slate-800 flex items-center justify-center text-[9px] font-bold text-white flex-shrink-0"
              style={{ background: m.color || '#3b6ee8' }}
            >
              {getInitials(m.name)}
            </div>
          ))}
        </div>

        <div className="flex items-center gap-2">
          {/* Due date */}
          {task.dueDate && (
            <span className={cx(
              'flex items-center gap-1 text-[10px] font-medium',
              overdue ? 'text-red-500' : dueSoon ? 'text-orange-500' : 'text-slate-400'
            )}>
              <Calendar size={11} />
              {formatDate(task.dueDate)}
            </span>
          )}

          {/* Status toggle */}
          <button
            onClick={cycleStatus}
            className={cx('badge cursor-pointer transition-all', status.bg, status.text)}
            title="Click to cycle status"
          >
            <StatusIcon size={10} />
            {status.label}
          </button>
        </div>
      </div>
    </div>
  )
}
