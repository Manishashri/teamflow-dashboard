export default function Loader({ fullscreen = false, size = 'md', text = '' }) {
  const sizes = { sm: 'w-5 h-5', md: 'w-8 h-8', lg: 'w-12 h-12' }

  const spinner = (
    <div className="flex flex-col items-center gap-3">
      <div className={`${sizes[size]} border-[3px] border-brand-200 dark:border-brand-900 border-t-brand-500 rounded-full animate-spin`} />
      {text && <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">{text}</p>}
    </div>
  )

  if (fullscreen) {
    return (
      <div className="fixed inset-0 bg-mesh flex items-center justify-center z-50">
        <div className="flex flex-col items-center gap-4">
          <span className="font-display font-bold text-2xl text-brand-600 dark:text-brand-400">TeamFlow</span>
          {spinner}
        </div>
      </div>
    )
  }

  return spinner
}

// ─── Skeleton variants ────────────────────────────────────────────────────────
export function SkeletonCard() {
  return (
    <div className="glass-card space-y-3">
      <div className="skeleton h-4 w-3/4" />
      <div className="skeleton h-3 w-full" />
      <div className="skeleton h-3 w-2/3" />
      <div className="flex gap-2 pt-1">
        <div className="skeleton h-6 w-16 rounded-full" />
        <div className="skeleton h-6 w-20 rounded-full" />
      </div>
    </div>
  )
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-3 py-2">
      <div className="skeleton h-9 w-9 rounded-full flex-shrink-0" />
      <div className="flex-1 space-y-1.5">
        <div className="skeleton h-3.5 w-1/3" />
        <div className="skeleton h-3 w-1/4" />
      </div>
    </div>
  )
}
