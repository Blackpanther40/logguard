import { Loader2, Pencil, Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'
import { AppLayout } from '../components/layout/AppLayout'
import { useAuth } from '../contexts/AuthContext'
import { useSearchQuery } from '../contexts/SearchContext'
import { useServers } from '../hooks/useServers'
import type { ServerEnvironment, ServerStatus } from '../types/database'

const emptyForm = {
  name: '',
  hostname: '',
  ip_address: '',
  environment: 'production' as ServerEnvironment,
  status: 'online' as ServerStatus,
  health_score: 100,
}

export function ConnectedServersPage() {
  const { user, configured } = useAuth()
  const search = useSearchQuery()
  const { servers, loading, error, createServer, updateServer, deleteServer } =
    useServers()
  const [form, setForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState<string | null>(null)
  const [formError, setFormError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const filtered = servers.filter((s) => {
    if (!search.trim()) return true
    const q = search.toLowerCase()
    return (
      s.name.toLowerCase().includes(q) ||
      s.hostname.toLowerCase().includes(q) ||
      (s.ip_address?.toLowerCase().includes(q) ?? false)
    )
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError(null)
    setSubmitting(true)

    const payload = {
      name: form.name.trim(),
      hostname: form.hostname.trim(),
      ip_address: form.ip_address.trim() || null,
      environment: form.environment,
      status: form.status,
      health_score: form.health_score,
    }

    const result = editingId
      ? await updateServer(editingId, payload)
      : await createServer(payload)

    setSubmitting(false)
    if (result.error) {
      setFormError(result.error)
      return
    }

    setForm(emptyForm)
    setEditingId(null)
  }

  const startEdit = (id: string) => {
    const server = servers.find((s) => s.id === id)
    if (!server) return
    setEditingId(id)
    setForm({
      name: server.name,
      hostname: server.hostname,
      ip_address: server.ip_address ?? '',
      environment: server.environment,
      status: server.status,
      health_score: server.health_score,
    })
  }

  return (
    <AppLayout title="Connected Servers">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="border-b border-slate-200 px-5 py-4 dark:border-slate-800">
            <h2 className="font-semibold text-slate-900 dark:text-white">
              Server inventory
            </h2>
            {!configured && (
              <p className="mt-1 text-sm text-amber-700 dark:text-amber-300">
                Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to enable live
                CRUD.
              </p>
            )}
            {configured && !user && (
              <p className="mt-1 text-sm text-slate-500">
                Sign in under Settings to sync servers to your account.
              </p>
            )}
          </div>

          {loading ? (
            <div className="flex items-center justify-center gap-2 py-16 text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading servers…
            </div>
          ) : error ? (
            <p className="px-5 py-8 text-sm text-red-600">{error}</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="min-w-full text-left text-sm">
                <thead className="bg-slate-50 text-xs uppercase text-slate-500 dark:bg-slate-800/50">
                  <tr>
                    <th className="px-5 py-3">Name</th>
                    <th className="px-5 py-3">Hostname</th>
                    <th className="px-5 py-3">Environment</th>
                    <th className="px-5 py-3">Status</th>
                    <th className="px-5 py-3">Health</th>
                    <th className="px-5 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                  {filtered.map((server) => (
                    <tr key={server.id}>
                      <td className="px-5 py-3 font-medium">{server.name}</td>
                      <td className="px-5 py-3 text-slate-600 dark:text-slate-300">
                        {server.hostname}
                      </td>
                      <td className="px-5 py-3 capitalize">{server.environment}</td>
                      <td className="px-5 py-3 capitalize">{server.status}</td>
                      <td className="px-5 py-3">{server.health_score}%</td>
                      <td className="px-5 py-3">
                        <div className="flex justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => startEdit(server.id)}
                            className="rounded p-1.5 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
                            aria-label={`Edit ${server.name}`}
                          >
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => void deleteServer(server.id)}
                            className="rounded p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30"
                            aria-label={`Delete ${server.name}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filtered.length === 0 && (
                    <tr>
                      <td
                        colSpan={6}
                        className="px-5 py-10 text-center text-slate-500"
                      >
                        No servers yet. Add one using the form.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </section>

        <aside className="h-fit rounded-xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h3 className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
            <Plus className="h-4 w-4" />
            {editingId ? 'Edit server' : 'Add server'}
          </h3>
          <form onSubmit={(e) => void handleSubmit(e)} className="mt-4 space-y-3">
            <label className="block text-xs font-medium text-slate-500">
              Display name
              <input
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
            </label>
            <label className="block text-xs font-medium text-slate-500">
              Hostname
              <input
                required
                value={form.hostname}
                onChange={(e) => setForm({ ...form, hostname: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
            </label>
            <label className="block text-xs font-medium text-slate-500">
              IP address
              <input
                value={form.ip_address}
                onChange={(e) => setForm({ ...form, ip_address: e.target.value })}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
            </label>
            <label className="block text-xs font-medium text-slate-500">
              Environment
              <select
                value={form.environment}
                onChange={(e) =>
                  setForm({
                    ...form,
                    environment: e.target.value as ServerEnvironment,
                  })
                }
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="production">Production</option>
                <option value="staging">Staging</option>
                <option value="development">Development</option>
              </select>
            </label>
            <label className="block text-xs font-medium text-slate-500">
              Status
              <select
                value={form.status}
                onChange={(e) =>
                  setForm({ ...form, status: e.target.value as ServerStatus })
                }
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <option value="online">Online</option>
                <option value="degraded">Degraded</option>
                <option value="offline">Offline</option>
              </select>
            </label>
            <label className="block text-xs font-medium text-slate-500">
              Health score
              <input
                type="number"
                min={0}
                max={100}
                value={form.health_score}
                onChange={(e) =>
                  setForm({ ...form, health_score: Number(e.target.value) })
                }
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
            </label>
            {formError && (
              <p className="text-xs text-red-600 dark:text-red-400">{formError}</p>
            )}
            <div className="flex gap-2 pt-1">
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {editingId ? 'Save changes' : 'Add server'}
              </button>
              {editingId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingId(null)
                    setForm(emptyForm)
                  }}
                  className="rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </aside>
      </div>
    </AppLayout>
  )
}
