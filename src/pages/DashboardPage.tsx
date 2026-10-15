import { ActivityChart } from '../components/dashboard/ActivityChart'
import { EventsTable } from '../components/dashboard/EventsTable'
import { MetricCards } from '../components/dashboard/MetricCards'
import { AppLayout } from '../components/layout/AppLayout'
import { useSearchQuery } from '../contexts/SearchContext'
import { useServers } from '../hooks/useServers'
import { mockSystemEvents } from '../data/mockEvents'

export function DashboardPage() {
  const { servers } = useServers()
  const search = useSearchQuery()

  const totalMonitored = servers.length || 12
  const healthScore =
    servers.length > 0
      ? Math.round(
          servers.reduce((sum, s) => sum + s.health_score, 0) / servers.length,
        )
      : 94
  const activeAlerts = mockSystemEvents.filter(
    (e) => e.status === 'warning' || e.status === 'critical',
  ).length

  return (
    <AppLayout title="Dashboard">
      <div className="space-y-6">
        <MetricCards
          totalMonitored={totalMonitored}
          healthScore={healthScore}
          highCves={7}
          activeAlerts={activeAlerts}
        />
        <ActivityChart />
        <EventsTable filter={search} />
      </div>
    </AppLayout>
  )
}
