import { useCallback, useEffect, useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../lib/supabase'
import type { Server, ServerInsert } from '../types/database'

export function useServers() {
  const { user } = useAuth()
  const [servers, setServers] = useState<Server[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchServers = useCallback(async () => {
    if (!supabase || !user) {
      setServers([])
      setLoading(false)
      return
    }

    setLoading(true)
    setError(null)
    const { data, error: fetchError } = await supabase
      .from('servers')
      .select('*')
      .order('created_at', { ascending: false })

    if (fetchError) {
      setError(fetchError.message)
      setServers([])
    } else {
      setServers((data as Server[] | null) ?? [])
    }
    setLoading(false)
  }, [user])

  useEffect(() => {
    void fetchServers()
  }, [fetchServers])

  const createServer = async (payload: ServerInsert) => {
    if (!supabase || !user) {
      return { error: 'Sign in and configure Supabase to manage servers.' }
    }

    const { error: insertError } = await supabase.from('servers').insert({
      ...payload,
      user_id: user.id,
    })

    if (insertError) return { error: insertError.message }
    await fetchServers()
    return { error: null }
  }

  const updateServer = async (id: string, payload: Partial<ServerInsert>) => {
    if (!supabase || !user) {
      return { error: 'Sign in and configure Supabase to manage servers.' }
    }

    const { error: updateError } = await supabase
      .from('servers')
      .update(payload)
      .eq('id', id)

    if (updateError) return { error: updateError.message }
    await fetchServers()
    return { error: null }
  }

  const deleteServer = async (id: string) => {
    if (!supabase || !user) {
      return { error: 'Sign in and configure Supabase to manage servers.' }
    }

    const { error: deleteError } = await supabase
      .from('servers')
      .delete()
      .eq('id', id)

    if (deleteError) return { error: deleteError.message }
    await fetchServers()
    return { error: null }
  }

  return {
    servers,
    loading,
    error,
    refetch: fetchServers,
    createServer,
    updateServer,
    deleteServer,
  }
}
