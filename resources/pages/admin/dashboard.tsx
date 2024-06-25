import { Card } from '#components/card'
import { AdminLayout } from '#layouts/admin.layout'
import MonthlyAnalytic from '#models/monthly_analytic'

interface DashboardProps {
  userCount: number
  gameCount: number
  softwareCount: number
  analytics: MonthlyAnalytic[]
}

export const Dashboard = (props: DashboardProps) => {
  const { userCount, gameCount, softwareCount, analytics } = props

  return (
    <AdminLayout title="Tableau de bord">
      <>
        <div class="flex wrap gap-5">
          <Card title="Nombre d'utilisateur">
            <h1 class="text-center mt-1">{userCount}</h1>
          </Card>
          <Card title="Nombre de jeu">
            <h1 class="text-center mt-1">{gameCount}</h1>
          </Card>
          <Card title="Nombre de logiciel">
            <h1 class="text-center mt-1">{softwareCount}</h1>
          </Card>
        </div>
        <canvas is="dashboard-chart" class="mt-5" data-analytics={JSON.stringify(analytics)} />
      </>
    </AdminLayout>
  )
}
