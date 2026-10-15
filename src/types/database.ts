export type ServerEnvironment = 'production' | 'staging' | 'development'
export type ServerStatus = 'online' | 'degraded' | 'offline'

export interface Server {
  id: string
  user_id: string
  name: string
  hostname: string
  ip_address: string | null
  environment: ServerEnvironment
  status: ServerStatus
  health_score: number
  created_at: string
  updated_at: string
}

export interface ServerInsert {
  name: string
  hostname: string
  ip_address?: string | null
  environment?: ServerEnvironment
  status?: ServerStatus
  health_score?: number
}
