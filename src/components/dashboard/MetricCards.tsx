import { Activity, AlertTriangle, Server, ShieldCheck } from 'lucide-react'

interface MetricCardsProps {
  totalMonitored: number
  healthScore: number
  highCves: number
  activeAlerts: number
}

const cards = (
  props: MetricCardsProps,
): {
  label: string
  value: string
  sub: string
  icon: typeof Server
  accent: string
}[] => [
  {
    label: 'Total Monitored',
    value: String(props.totalMonitored),
    sub: 'Connected endpoints',
    icon: Server,
    accent: 'text-indigo-600 bg-indigo-50 dark:bg-indigo-950/50 dark:text-indigo-300',
  },
  {
    label: 'Health Score',
    value: `${props.healthScore}%`,
    sub: 'Fleet average',
    icon: ShieldCheck,
    accent: 'text-emerald-600 bg-emerald-50 dark:bg-emerald-950/50 dark:text-emerald-300',
  },
  {
    label: 'High CVEs',
    value: String(props.highCves),
    sub: 'CVSS ≥ 7.0',
    icon: AlertTriangle,
    accent: 'text-amber-600 bg-amber-50 dark:bg-amber-950/50 dark:text-amber-300',
  },
  {
    label: 'Active Alerts',
    value: String(props.activeAlerts),
    sub: 'Last 24 hours',
    icon: Activity,
    accent: 'text-rose-600 bg-rose-50 dark:bg-rose-950/50 dark:text-rose-300',
  },
]

export function MetricCards(props: MetricCardsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {cards(props).map(({ label, value, sub, icon: Icon, accent }) => (
        <article
          key={label}
          className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
        >
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {label}
              </p>
              <p className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">
                {value}
              </p>
              <p className="mt-1 text-xs text-slate-400">{sub}</p>
            </div>
            <div className={`rounded-lg p-2.5 ${accent}`}>
              <Icon className="h-5 w-5" aria-hidden />
            </div>
          </div>
        </article>
      ))}
    </div>
  )
}
