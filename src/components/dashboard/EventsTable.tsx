import { mockSystemEvents, type SystemEvent } from '../../data/mockEvents'
import { StatusTag } from '../ui/StatusTag'

interface EventsTableProps {
  filter?: string
}

function matchesFilter(event: SystemEvent, filter: string) {
  if (!filter.trim()) return true
  const q = filter.toLowerCase()
  return (
    event.server.toLowerCase().includes(q) ||
    event.event.toLowerCase().includes(q) ||
    event.status.includes(q)
  )
}

export function EventsTable({ filter = '' }: EventsTableProps) {
  const rows = mockSystemEvents.filter((e) => matchesFilter(e, filter))

  return (
    <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
        <h2 className="text-base font-semibold text-slate-900 dark:text-white">
          Recent system events
        </h2>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Latest security and health signals across your fleet
        </p>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-50 text-xs uppercase tracking-wide text-slate-500 dark:bg-slate-800/50 dark:text-slate-400">
            <tr>
              <th className="px-5 py-3 font-medium">Timestamp</th>
              <th className="px-5 py-3 font-medium">Server</th>
              <th className="px-5 py-3 font-medium">Event</th>
              <th className="px-5 py-3 font-medium">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/30">
                <td className="whitespace-nowrap px-5 py-3 text-slate-600 dark:text-slate-300">
                  {row.timestamp}
                </td>
                <td className="px-5 py-3 font-medium text-slate-900 dark:text-white">
                  {row.server}
                </td>
                <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                  {row.event}
                </td>
                <td className="px-5 py-3">
                  <StatusTag status={row.status} />
                </td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td
                  colSpan={4}
                  className="px-5 py-8 text-center text-slate-500 dark:text-slate-400"
                >
                  No events match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}
