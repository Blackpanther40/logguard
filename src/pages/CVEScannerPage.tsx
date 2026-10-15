import { ExternalLink, Loader2, Search } from 'lucide-react'
import { useState } from 'react'
import { AppLayout } from '../components/layout/AppLayout'
import { getCveDescription, getCveSeverity, searchCves } from '../lib/nvd'
import type { NvdCveItem } from '../types/nvd'

export function CVEScannerPage() {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<NvdCveItem[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [searched, setSearched] = useState(false)

  const runSearch = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!query.trim()) return

    setLoading(true)
    setError(null)
    setSearched(true)

    try {
      const items = await searchCves(query)
      setResults(items)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Search failed')
      setResults([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <AppLayout title="CVE Scanner">
      <div className="mx-auto max-w-4xl space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-base font-semibold text-slate-900 dark:text-white">
            Live NVD vulnerability search
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Search the National Vulnerability Database by package or product name
            (e.g. openssl, nginx, log4j).
          </p>

          <form onSubmit={(e) => void runSearch(e)} className="mt-4 flex gap-2">
            <label className="relative flex-1">
              <Search
                className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-slate-400"
                aria-hidden
              />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Package or product name…"
                className="w-full rounded-lg border border-slate-200 py-2.5 pr-3 pl-9 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
            </label>
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Search className="h-4 w-4" />
              )}
              Scan
            </button>
          </form>

          {error && (
            <p className="mt-3 text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
        </section>

        {loading && (
          <div className="flex justify-center py-12 text-slate-500">
            <Loader2 className="h-6 w-6 animate-spin" />
          </div>
        )}

        {!loading && searched && results.length === 0 && !error && (
          <p className="text-center text-sm text-slate-500">
            No CVEs found for &quot;{query}&quot;.
          </p>
        )}

        <ul className="space-y-3">
          {results.map((item) => {
            const { score, label } = getCveSeverity(item)
            const isHigh = score !== null && score >= 7
            return (
              <li
                key={item.cve.id}
                className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
              >
                <div className="flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <a
                      href={`https://nvd.nist.gov/vuln/detail/${item.cve.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 font-semibold text-indigo-600 hover:underline dark:text-indigo-400"
                    >
                      {item.cve.id}
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                    {item.cve.published && (
                      <p className="mt-0.5 text-xs text-slate-400">
                        Published {item.cve.published.slice(0, 10)}
                      </p>
                    )}
                  </div>
                  <span
                    className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      isHigh
                        ? 'bg-red-100 text-red-800 dark:bg-red-950/60 dark:text-red-300'
                        : 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                    }`}
                  >
                    {score !== null ? `${score} ${label}` : label}
                  </span>
                </div>
                <p className="mt-3 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
                  {getCveDescription(item)}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </AppLayout>
  )
}
