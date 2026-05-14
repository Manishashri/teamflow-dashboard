import { CheckSquare, Users, Clock, TrendingUp } from 'lucide-react'
import { useTasks, useTeam, useActivities } from '../hooks'

import { getTaskStats } from '../utils/helpers'

import ProgressCard from '../components/ProgressCard'
import TaskCard from '../components/TaskCard'
import TeamCard from '../components/TeamCard'
import ActivityTimeline from '../components/ActivityTimeline'
import { SkeletonCard } from '../components/Loader'

export default function Dashboard() {

  const {
    tasks,
    loading: tLoad,
    updateTask,
    deleteTask
  } = useTasks()

  const {
    members,
    loading: mLoad
  } = useTeam()

  const {
    activities,
    loading: aLoad
  } = useActivities()

  const stats = getTaskStats(tasks)

  const recent = tasks.slice(0, 3)

  const STAT_CARDS = [
    {
      label: 'Total Tasks',
      value: stats.total,
      change: '+2',
      positive: true,
      icon: CheckSquare,
      color: 'brand'
    },
    {
      label: 'In Progress',
      value: stats.in_progress,
      change: null,
      positive: null,
      icon: Clock,
      color: 'amber'
    },
    {
      label: 'Completed',
      value: stats.completed,
      change: '+1',
      positive: true,
      icon: TrendingUp,
      color: 'emerald'
    },
    {
      label: 'Team Members',
      value: members.length,
      change: '+1',
      positive: true,
      icon: Users,
      color: 'purple'
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in">

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STAT_CARDS.map((s) => (
          <ProgressCard
            key={s.label}
            {...s}
          />
        ))}
      </div>

      {/* Completion Card */}
      <div className="glass-card flex flex-col sm:flex-row items-center gap-6">

        <div className="relative w-24 h-24 flex-shrink-0">

          <svg
            className="w-full h-full -rotate-90"
            viewBox="0 0 100 100"
          >

            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="currentColor"
              strokeWidth="10"
              className="text-slate-100 dark:text-slate-700"
            />

            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="url(#grad)"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={`${2 * Math.PI * 42}`}
              strokeDashoffset={`${2 * Math.PI * 42 * (1 - stats.completionRate / 100)}`}
              className="transition-all duration-700"
            />

            <defs>
              <linearGradient
                id="grad"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="0%"
              >
                <stop offset="0%" stopColor="#5290f5" />
                <stop offset="100%" stopColor="#3b6ee8" />
              </linearGradient>
            </defs>

          </svg>

          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-display font-bold text-xl text-slate-800 dark:text-slate-100">
              {stats.completionRate}%
            </span>
          </div>

        </div>

        <div>
          <h3 className="section-title">
            Overall Completion Rate
          </h3>

          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            {stats.completed} of {stats.total} tasks completed this sprint.
          </p>

          <div className="flex gap-4 mt-3">

            <span className="text-xs text-slate-500">
              <span className="font-semibold text-slate-700 dark:text-slate-200">
                {stats.todo}
              </span>{' '}
              Todo
            </span>

            <span className="text-xs text-slate-500">
              <span className="font-semibold text-amber-500">
                {stats.in_progress}
              </span>{' '}
              In Progress
            </span>

            <span className="text-xs text-slate-500">
              <span className="font-semibold text-emerald-500">
                {stats.completed}
              </span>{' '}
              Done
            </span>

          </div>
        </div>
      </div>

      {/* Recent Tasks + Activity */}
      <div className="grid lg:grid-cols-3 gap-6">

        {/* Tasks */}
        <div className="lg:col-span-2 space-y-4">

          <div className="flex items-center justify-between">
            <h2 className="section-title">
              Recent Tasks
            </h2>

            <a
              href="/tasks"
              className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium"
            >
              View all →
            </a>
          </div>

          {tLoad
            ? Array(3)
                .fill(0)
                .map((_, i) => (
                  <SkeletonCard key={i} />
                ))
            : recent.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  members={members}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                />
              ))
          }

        </div>

        {/* Activity Timeline */}
        <div className="space-y-4">

          <h2 className="section-title">
            Activity Feed
          </h2>

          <ActivityTimeline
            activities={activities}
            loading={aLoad}
          />

        </div>
      </div>

      {/* Team Members */}
      <div>

        <div className="flex items-center justify-between mb-4">

          <h2 className="section-title">
            Team Members
          </h2>

          <a
            href="/team"
            className="text-xs text-brand-600 dark:text-brand-400 hover:underline font-medium"
          >
            View all →
          </a>

        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">

          {mLoad
            ? Array(6)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="skeleton h-40 rounded-2xl"
                  />
                ))
            : members
                .slice(0, 6)
                .map((m) => (
                  <TeamCard
                    key={m.id}
                    member={m}
                  />
                ))
          }

        </div>
      </div>
    </div>
  )
}