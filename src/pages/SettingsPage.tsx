import { Loader2 } from 'lucide-react'
import { useState } from 'react'
import { AppLayout } from '../components/layout/AppLayout'
import { useAuth } from '../contexts/AuthContext'

export function SettingsPage() {
  const { user, configured, loading, signIn, signUp, signOut } = useAuth()
  const [mode, setMode] = useState<'signin' | 'signup'>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault()
    setMessage(null)
    setSubmitting(true)

    const result =
      mode === 'signin'
        ? await signIn(email, password)
        : await signUp(email, password)

    setSubmitting(false)
    if (result.error) {
      setMessage(result.error)
    } else if (mode === 'signup') {
      setMessage('Check your email to confirm your account (if required).')
    }
  }

  return (
    <AppLayout title="Settings">
      <div className="mx-auto max-w-lg space-y-6">
        <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="font-semibold text-slate-900 dark:text-white">
            Supabase authentication
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Server inventory is stored per user with row-level security. Copy{' '}
            <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">
              .env.example
            </code>{' '}
            to{' '}
            <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">
              .env
            </code>{' '}
            and run{' '}
            <code className="rounded bg-slate-100 px-1 dark:bg-slate-800">
              supabase/schema.sql
            </code>{' '}
            in your project.
          </p>

          {!configured && (
            <p className="mt-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800 dark:bg-amber-950/40 dark:text-amber-200">
              Supabase environment variables are not set.
            </p>
          )}

          {loading ? (
            <div className="mt-6 flex justify-center text-slate-500">
              <Loader2 className="h-5 w-5 animate-spin" />
            </div>
          ) : user ? (
            <div className="mt-6 space-y-4">
              <p className="text-sm">
                Signed in as{' '}
                <span className="font-medium text-slate-900 dark:text-white">
                  {user.email}
                </span>
              </p>
              <button
                type="button"
                onClick={() => void signOut()}
                className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"
              >
                Sign out
              </button>
            </div>
          ) : (
            <form onSubmit={(e) => void handleAuth(e)} className="mt-6 space-y-3">
              <div className="flex gap-2 text-sm">
                <button
                  type="button"
                  onClick={() => setMode('signin')}
                  className={`rounded-lg px-3 py-1.5 ${
                    mode === 'signin'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Sign in
                </button>
                <button
                  type="button"
                  onClick={() => setMode('signup')}
                  className={`rounded-lg px-3 py-1.5 ${
                    mode === 'signup'
                      ? 'bg-indigo-600 text-white'
                      : 'text-slate-600 dark:text-slate-300'
                  }`}
                >
                  Sign up
                </button>
              </div>
              <input
                type="email"
                required
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
              <input
                type="password"
                required
                minLength={6}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-800"
              />
              {message && (
                <p className="text-sm text-slate-600 dark:text-slate-300">
                  {message}
                </p>
              )}
              <button
                type="submit"
                disabled={submitting || !configured}
                className="w-full rounded-lg bg-indigo-600 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-60"
              >
                {mode === 'signin' ? 'Sign in' : 'Create account'}
              </button>
            </form>
          )}
        </section>
      </div>
    </AppLayout>
  )
}
