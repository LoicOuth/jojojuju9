import { Card } from '#components/card'
import { AdminLayout } from '#layouts/admin.layout'

interface DashboardProps {
  userCount: number
  gameCount: number
  softwareCount: number
}

export const Dashboard = (props: DashboardProps) => {
  const { userCount, gameCount, softwareCount } = props

  return (
    <AdminLayout title="Tableau de bord">
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
    </AdminLayout>
  )
}
