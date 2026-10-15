import type { EventStatus } from '../../data/mockEvents'

const styles: Record<EventStatus, string> = {
  success:
    'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300',
  warning:
    'bg-amber-100 text-amber-800 dark:bg-amber-950/60 dark:text-amber-300',
  critical: 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300',
  info: 'bg-sky-100 text-sky-800 dark:bg-sky-950/60 dark:text-sky-300',
}

export function StatusTag({ status }: { status: EventStatus }) {
  return (
    <span
      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium capitalize ${styles[status]}`}
    >
      {status}
    </span>
  )
}
