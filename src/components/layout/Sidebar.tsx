import {
  Bell,
  LayoutDashboard,
  Moon,
  ScanSearch,
  Server,
  Settings,
  Shield,
  Sun,
} from 'lucide-react'
import { NavLink } from 'react-router-dom'
import { useTheme } from '../../contexts/ThemeContext'

const navItems = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/servers', label: 'Connected Servers', icon: Server },
  { to: '/cve-scanner', label: 'CVE Scanner', icon: ScanSearch },
  { to: '/alerts', label: 'Alert Logs', icon: Bell },
  { to: '/settings', label: 'Settings', icon: Settings },
]

export function Sidebar() {
  const { theme, toggleTheme } = useTheme()

  return (
    <aside className="flex h-full w-64 shrink-0 flex-col border-r border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900">
      <div className="flex items-center gap-2 border-b border-slate-200 px-5 py-5 dark:border-slate-800">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-600 text-white">
          <Shield className="h-5 w-5" aria-hidden />
        </div>
        <div>
          <p className="text-sm font-semibold tracking-tight text-slate-900 dark:text-white">
            LogGuard
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Security & Health
          </p>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navItems.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/50 dark:text-indigo-300'
                  : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
              }`
            }
          >
            <Icon className="h-4 w-4 shrink-0" aria-hidden />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="border-t border-slate-200 p-4 dark:border-slate-800">
        <button
          type="button"
          onClick={toggleTheme}
          className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
        >
          {theme === 'light' ? (
            <>
              <Moon className="h-4 w-4" aria-hidden />
              Dark mode
            </>
          ) : (
            <>
              <Sun className="h-4 w-4" aria-hidden />
              Light mode
            </>
          )}
        </button>
      </div>
    </aside>
  )
}
