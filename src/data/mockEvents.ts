export type EventStatus = 'success' | 'warning' | 'critical' | 'info'

export interface SystemEvent {
  id: string
  timestamp: string
  server: string
  event: string
  status: EventStatus
}

export const mockSystemEvents: SystemEvent[] = [
  {
    id: '1',
    timestamp: '2026-10-16 02:45',
    server: 'api-prod-01',
    event: 'Health check passed',
    status: 'success',
  },
  {
    id: '2',
    timestamp: '2026-10-16 02:32',
    server: 'db-cluster-east',
    event: 'Memory usage above 85%',
    status: 'warning',
  },
  {
    id: '3',
    timestamp: '2026-10-16 02:18',
    server: 'worker-03',
    event: 'Failed SSH authentication (3 attempts)',
    status: 'critical',
  },
  {
    id: '4',
    timestamp: '2026-10-16 01:55',
    server: 'cache-redis-02',
    event: 'Patch deployment scheduled',
    status: 'info',
  },
  {
    id: '5',
    timestamp: '2026-10-16 01:40',
    server: 'api-prod-02',
    event: 'TLS certificate renewed',
    status: 'success',
  },
]

export const activityChartData = [
  { time: '00:00', cpu: 42, memory: 58, responseTime: 120 },
  { time: '04:00', cpu: 38, memory: 55, responseTime: 115 },
  { time: '08:00', cpu: 65, memory: 72, responseTime: 145 },
  { time: '12:00', cpu: 78, memory: 81, responseTime: 190 },
  { time: '16:00', cpu: 71, memory: 76, responseTime: 165 },
  { time: '20:00', cpu: 52, memory: 63, responseTime: 130 },
  { time: 'Now', cpu: 48, memory: 60, responseTime: 125 },
]
