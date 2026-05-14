
import { useState, useMemo } from 'react'
import { Plus, Search, X, ShieldAlert } from 'lucide-react'

import { useTasks, useTeam } from '../hooks'
import { useAuth } from '../context/AuthContext'

import TaskCard from '../components/TaskCard'
import { SkeletonCard } from '../components/Loader'

import {
  PRIORITY_CONFIG,
  STATUS_CONFIG
} from '../utils/helpers'

const EMPTY_TASK = {
  title: '',
  description: '',
  status: 'todo',
  priority: 'medium',
  assignedTo: [],
  dueDate: '',
  tags: ''
}

export default function Tasks() {

  const { tasks, loading, addTask, updateTask, deleteTask } = useTasks()
  const { members } = useTeam()

  // ADMIN CHECK
  const { isAdmin } = useAuth()

  const [search, setSearch] = useState('')
  const [filterPrio, setFilterPrio] = useState('all')
  const [filterStat, setFilterStat] = useState('all')

  const [showModal, setShowModal] = useState(false)

  const [form, setForm] = useState(EMPTY_TASK)

  const [saving, setSaving] = useState(false)

  // ───────────────────────────────────────────────────────────────────────────
  // Filtered Tasks
  // ───────────────────────────────────────────────────────────────────────────

  const filtered = useMemo(() => tasks.filter(t => {

    const matchSearch =
      !search ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.description?.toLowerCase().includes(search.toLowerCase())

    const matchPrio =
      filterPrio === 'all' ||
      t.priority === filterPrio

    const matchStat =
      filterStat === 'all' ||
      t.status === filterStat

    return matchSearch && matchPrio && matchStat

  }), [tasks, search, filterPrio, filterStat])

  // ───────────────────────────────────────────────────────────────────────────
  // Group Tasks
  // ───────────────────────────────────────────────────────────────────────────

  const grouped = {
    todo:
      filtered.filter(t => t.status === 'todo'),

    in_progress:
      filtered.filter(t => t.status === 'in_progress'),

    completed:
      filtered.filter(t => t.status === 'completed'),
  }

  // ───────────────────────────────────────────────────────────────────────────
  // Save Task
  // ───────────────────────────────────────────────────────────────────────────

  const handleSave = async () => {

    if (!form.title.trim()) return

    setSaving(true)

    try {

      await addTask({
        ...form,

        tags: form.tags
          ? form.tags
              .split(',')
              .map(s => s.trim())
              .filter(Boolean)
          : [],

        progress: 0,
      })

      setForm(EMPTY_TASK)

      setShowModal(false)

    } finally {

      setSaving(false)
    }
  }

  return (
    <div className="space-y-6 animate-fade-in">

      {/* Toolbar */}
      <div className="flex flex-wrap gap-3 items-center">

        {/* Search */}
        <div className="relative flex-1 min-w-[200px]">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search tasks…"
            className="input-field pl-9 py-2.5 text-sm"
          />
        </div>

        {/* Priority Filter */}
        <select
          value={filterPrio}
          onChange={e => setFilterPrio(e.target.value)}
          className="input-field w-auto py-2.5 text-sm pr-8"
        >
          <option value="all">All priorities</option>

          {Object.entries(PRIORITY_CONFIG).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </select>

        {/* Status Filter */}
        <select
          value={filterStat}
          onChange={e => setFilterStat(e.target.value)}
          className="input-field w-auto py-2.5 text-sm pr-8"
        >
          <option value="all">All statuses</option>

          {Object.entries(STATUS_CONFIG).map(([k, v]) => (
            <option key={k} value={k}>
              {v.label}
            </option>
          ))}
        </select>

        {/* ADMIN ONLY BUTTON */}
        {isAdmin && (
          <button
            onClick={() => setShowModal(true)}
            className="btn-primary flex items-center gap-2"
          >
            <Plus size={16} />
            New Task
          </button>
        )}
      </div>

      {/* Employee Notice */}
      {!isAdmin && (
        <div className="glass-card flex items-center gap-3 text-sm text-amber-600 dark:text-amber-400">
          <ShieldAlert size={18} />
          Only admins can create and assign tasks.
        </div>
      )}

      {/* Kanban Columns */}
      <div className="grid md:grid-cols-3 gap-6">

        {Object.entries(grouped).map(([status, items]) => {

          const cfg = STATUS_CONFIG[status]

          return (
            <div key={status}>

              <div className="flex items-center gap-2 mb-3">
                <span className={`badge ${cfg.bg} ${cfg.text} text-[11px]`}>
                  {cfg.label}
                </span>

                <span className="text-xs text-slate-400 font-medium">
                  ({items.length})
                </span>
              </div>

              <div className="space-y-3">

                {loading
                  ? Array(2)
                      .fill(0)
                      .map((_, i) => (
                        <SkeletonCard key={i} />
                      ))

                  : items.length === 0

                    ? (
                      <div className="glass-card text-center text-sm text-slate-400 py-10">
                        No tasks here
                      </div>
                    )

                    : items.map(t => (
                        <TaskCard
                          key={t.id}
                          task={t}
                          members={members}
                          onUpdate={updateTask}
                          onDelete={deleteTask}
                        />
                      ))
                }

              </div>
            </div>
          )
        })}
      </div>

      {/* ADMIN ONLY MODAL */}
      {showModal && isAdmin && (

        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 px-4 animate-fade-in"
          onClick={() => setShowModal(false)}
        >

          <div
            className="glass rounded-3xl p-6 w-full max-w-md shadow-2xl animate-slide-up"
            onClick={e => e.stopPropagation()}
          >

            <div className="flex items-center justify-between mb-5">

              <h2 className="font-display font-semibold text-lg text-slate-800 dark:text-slate-100">
                New Task
              </h2>

              <button
                onClick={() => setShowModal(false)}
                className="btn-ghost p-1.5"
              >
                <X size={18} />
              </button>
            </div>

            <div className="space-y-4">

              {/* Title */}
              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  Title *
                </label>

                <input
                  value={form.title}
                  onChange={e =>
                    setForm(f => ({
                      ...f,
                      title: e.target.value
                    }))
                  }
                  placeholder="Task title"
                  className="input-field"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  Description
                </label>

                <textarea
                  rows={3}
                  value={form.description}
                  onChange={e =>
                    setForm(f => ({
                      ...f,
                      description: e.target.value
                    }))
                  }
                  placeholder="What needs to be done?"
                  className="input-field resize-none"
                />
              </div>

              {/* Priority + Status */}
              <div className="grid grid-cols-2 gap-3">

                <div>
                  <label className="block text-xs font-semibold mb-1.5">
                    Priority
                  </label>

                  <select
                    value={form.priority}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        priority: e.target.value
                      }))
                    }
                    className="input-field text-sm"
                  >
                    {Object.entries(PRIORITY_CONFIG).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold mb-1.5">
                    Status
                  </label>

                  <select
                    value={form.status}
                    onChange={e =>
                      setForm(f => ({
                        ...f,
                        status: e.target.value
                      }))
                    }
                    className="input-field text-sm"
                  >
                    {Object.entries(STATUS_CONFIG).map(([k, v]) => (
                      <option key={k} value={k}>
                        {v.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Due Date */}
              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  Due Date
                </label>

                <input
                  type="date"
                  value={form.dueDate}
                  onChange={e =>
                    setForm(f => ({
                      ...f,
                      dueDate: e.target.value
                    }))
                  }
                  className="input-field text-sm"
                />
              </div>

              {/* Tags */}
              <div>
                <label className="block text-xs font-semibold mb-1.5">
                  Tags
                </label>

                <input
                  value={form.tags}
                  onChange={e =>
                    setForm(f => ({
                      ...f,
                      tags: e.target.value
                    }))
                  }
                  placeholder="frontend, api, ui"
                  className="input-field text-sm"
                />
              </div>

            </div>

            {/* Footer */}
            <div className="flex gap-3 mt-6">

              <button
                onClick={() => setShowModal(false)}
                className="btn-ghost flex-1"
              >
                Cancel
              </button>

              <button
                onClick={handleSave}
                disabled={saving || !form.title.trim()}
                className="btn-primary flex-1 flex items-center justify-center gap-2"
              >
                {saving
                  ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                      Saving…
                    </>
                  )
                  : 'Create Task'
                }
              </button>

            </div>

          </div>
        </div>
      )}
    </div>
  )
}

