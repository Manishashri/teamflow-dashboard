import {
  CheckCircle2,
  MessageSquare,
  Plus,
  Edit2,
  UserPlus,
  Rocket
} from 'lucide-react'

import { MOCK_USERS } from '../data/mockData'
import { SkeletonRow } from './Loader'

const ICON_MAP = {
  check: {
    Icon: CheckCircle2,
    color: 'text-emerald-500',
    bg: 'bg-emerald-50 dark:bg-emerald-900/20'
  },

  message: {
    Icon: MessageSquare,
    color: 'text-brand-500',
    bg: 'bg-brand-50 dark:bg-brand-900/20'
  },

  plus: {
    Icon: Plus,
    color: 'text-purple-500',
    bg: 'bg-purple-50 dark:bg-purple-900/20'
  },

  edit: {
    Icon: Edit2,
    color: 'text-amber-500',
    bg: 'bg-amber-50 dark:bg-amber-900/20'
  },

  user: {
    Icon: UserPlus,
    color: 'text-sky-500',
    bg: 'bg-sky-50 dark:bg-sky-900/20'
  },

  rocket: {
    Icon: Rocket,
    color: 'text-rose-500',
    bg: 'bg-rose-50 dark:bg-rose-900/20'
  },
}

export default function ActivityTimeline({
  activities = [],
  loading = false
}) {

  if (loading) {
    return (
      <div className="glass-card space-y-3 p-5">
        {Array(5)
          .fill(0)
          .map((_, i) => (
            <SkeletonRow key={i} />
          ))}
      </div>
    )
  }

  return (
    <div className="glass-card p-5">

      <h2 className="text-lg font-bold mb-5">
        Activity Timeline
      </h2>

      {activities.length === 0 ? (

        <p className="text-sm text-slate-400">
          No activity available.
        </p>

      ) : (

        <ol className="relative border-l border-slate-200 dark:border-slate-700 ml-3 space-y-6">

          {activities.map((activity) => {

            const member =
              MOCK_USERS.find(
                (u) => u.id === activity.userId
              )

            const cfg =
              ICON_MAP[activity.icon] || ICON_MAP.edit

            const { Icon } = cfg

            return (
              <li
                key={activity.id}
                className="ml-6"
              >

                {/* ICON */}
                <span
                  className={`absolute -left-3 flex items-center justify-center w-6 h-6 rounded-full ${cfg.bg}`}
                >
                  <Icon
                    size={12}
                    className={cfg.color}
                  />
                </span>

                {/* CONTENT */}
                <div>

                  <p className="text-sm text-slate-700 dark:text-slate-200 leading-relaxed">

                    <span className="font-semibold">
                      {member?.name || 'User'}
                    </span>{' '}

                    {activity.action}{' '}

                    <span className="font-medium text-brand-600 dark:text-brand-400">
                      {activity.target}
                    </span>

                  </p>

                  <span className="text-xs text-slate-400 mt-1 block">
                    {activity.time}
                  </span>

                </div>
              </li>
            )
          })}
        </ol>
      )}
    </div>
  )
}