import { useState } from 'react'
import { Search, Users } from 'lucide-react'
import { useTeam } from '../hooks'
import TeamCard from '../components/TeamCard'

export default function Team() {
  const { members, loading } = useTeam()
  const [search, setSearch] = useState('')

const filtered = members.filter(m => {
  if (!m) return false
  const name = (m.name || '').toLowerCase()
  const role = (m.role || '').toLowerCase()
  const q    = search.toLowerCase()
  return name.includes(q) || role.includes(q)
})

const online  = filtered.filter(m => m && m.online === true)
const offline = filtered.filter(m => m && !m.online)

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Header row */}
      <div className="flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search members…" className="input-field pl-9 py-2.5 text-sm" />
        </div>
        <div className="flex items-center gap-2 px-4 py-2.5 glass rounded-xl">
          <Users size={15} className="text-slate-400" />
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">{members.length} members</span>
          <span className="text-xs text-emerald-500 font-semibold ml-1">● {online.length} online</span>
        </div>
      </div>

      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          {Array(6).fill(0).map((_, i) => <div key={i} className="skeleton h-52 rounded-2xl" />)}
        </div>
      ) : (
        <>
          {online.length > 0 && (
            <div>
              <h2 className="section-title mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-emerald-400 rounded-full inline-block" /> Online
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {online.map(m => <TeamCard key={m.id} member={m} />)}
              </div>
            </div>
          )}

          {offline.length > 0 && (
            <div>
              <h2 className="section-title mb-4 flex items-center gap-2">
                <span className="w-2 h-2 bg-slate-300 dark:bg-slate-600 rounded-full inline-block" /> Offline
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
                {offline.map(m => <TeamCard key={m.id} member={m} />)}
              </div>
            </div>
          )}

          {filtered.length === 0 && (
            <div className="text-center py-20 text-slate-400 text-sm">No members match your search.</div>
          )}
        </>
      )}
    </div>
  )
}
