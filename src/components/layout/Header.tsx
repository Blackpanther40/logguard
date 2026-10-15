import { Search } from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

interface HeaderProps {
  title: string
  search: string
  onSearchChange: (value: string) => void
}

export function Header({ title, search, onSearchChange }: HeaderProps) {
  const { user } = useAuth()

  const initials = user?.email
    ? user.email.slice(0, 2).toUpperCase()
    : 'LG'

  return (
    <header className="sticky top-0 z-10 flex flex-col gap-4 border-b border-slate-200 bg-white/90 px-4 py-4 backdrop-blur sm:flex-row sm:items-center sm:justify-between sm:px-6 dark:border-slate-800 dark:bg-slate-900/90">
      <div className="flex items-center gap-3">
        <h1 className="text-lg font-semibold text-slate-900 dark:text-white sm:text-xl">
          {title}
        </h1>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
          All systems operational
        </span>
      </div>

      <div className="flex items-center gap-3">
        <label className="relative flex-1 sm:w-72">
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
            aria-hidden
          />
          <input
            type="search"
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search servers, alerts, CVEs…"
            className="w-full rounded-lg border border-slate-200 bg-slate-50 py-2 pr-3 pl-9 text-sm text-slate-900 outline-none ring-indigo-500 placeholder:text-slate-400 focus:ring-2 dark:border-slate-700 dark:bg-slate-800 dark:text-white"
          />
        </label>
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-indigo-600 text-xs font-semibold text-white"
          title={user?.email ?? 'Guest'}
        >
          {initials}
        </div>
      </div>
    </header>
  )
}
