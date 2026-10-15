import { AppLayout } from '../components/layout/AppLayout'
import { useSearchQuery } from '../contexts/SearchContext'
import { mockSystemEvents } from '../data/mockEvents'
import { StatusTag } from '../components/ui/StatusTag'

export function AlertLogsPage() {
  const search = useSearchQuery()

  const alerts = mockSystemEvents.filter((e) => {
    const isAlert = e.status === 'warning' || e.status === 'critical'
    if (!isAlert) return false
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      e.server.toLowerCase().includes(q) ||
      e.event.toLowerCase().includes(q)
    )
  })

  return (
    <AppLayout title="Alert Logs">
      <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Active & recent alerts
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Warnings and critical events from your monitored infrastructure
          </p>
        </div>
        <ul className="divide-y divide-slate-100 dark:divide-slate-800">
          {alerts.map((alert) => (
            <li
              key={alert.id}
              className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div>
                <p className="font-medium text-slate-900 dark:text-white">
                  {alert.event}
                </p>
                <p className="text-sm text-slate-500">
                  {alert.server} · {alert.timestamp}
                </p>
              </div>
              <StatusTag status={alert.status} />
            </li>
          ))}
          {alerts.length === 0 && (
            <li className="px-5 py-12 text-center text-sm text-slate-500">
              No alerts match your filters.
            </li>
          )}
        </ul>
      </section>
    </AppLayout>
  )
}
