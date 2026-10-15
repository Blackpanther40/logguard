import { activityChartData } from '../../data/mockEvents'

const series = [
  { key: 'cpu' as const, label: 'CPU %', color: '#6366f1' },
  { key: 'memory' as const, label: 'Memory %', color: '#10b981' },
  { key: 'responseTime' as const, label: 'Response (ms)', color: '#f59e0b' },
]

function buildPath(
  values: number[],
  width: number,
  height: number,
  max: number,
): string {
  if (values.length === 0) return ''
  const step = width / Math.max(values.length - 1, 1)
  return values
    .map((v, i) => {
      const x = i * step
      const y = height - (v / max) * height
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`
    })
    .join(' ')
}

export function ActivityChart() {
  const width = 640
  const height = 200
  const maxValue = 200

  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            System activity
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            CPU, memory, and response time (24h)
          </p>
        </div>
        <ul className="flex flex-wrap gap-4 text-xs text-slate-600 dark:text-slate-300">
          {series.map((s) => (
            <li key={s.key} className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ backgroundColor: s.color }}
              />
              {s.label}
            </li>
          ))}
        </ul>
      </div>

      <div className="overflow-x-auto">
        <svg
          viewBox={`0 0 ${width} ${height + 28}`}
          className="w-full min-w-[320px] text-slate-400"
          role="img"
          aria-label="CPU, memory, and response time over 24 hours"
        >
          {[0, 0.25, 0.5, 0.75, 1].map((t) => (
            <line
              key={t}
              x1={0}
              y1={height * t}
              x2={width}
              y2={height * t}
              stroke="currentColor"
              strokeOpacity={0.15}
            />
          ))}

          {series.map((s) => (
            <path
              key={s.key}
              d={buildPath(
                activityChartData.map((d) => d[s.key]),
                width,
                height,
                maxValue,
              )}
              fill="none"
              stroke={s.color}
              strokeWidth={2.5}
              strokeLinejoin="round"
              strokeLinecap="round"
            />
          ))}

          {activityChartData.map((d, i) => {
            const x = (i / Math.max(activityChartData.length - 1, 1)) * width
            return (
              <text
                key={d.time}
                x={x}
                y={height + 20}
                textAnchor="middle"
                fontSize={11}
                fill="currentColor"
              >
                {d.time}
              </text>
            )
          })}
        </svg>
      </div>
    </section>
  )
}
