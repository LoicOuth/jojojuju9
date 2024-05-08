import { Card } from '#components/card'
import { AdminLayout } from '#layouts/admin.layout'

interface DashboardProps {
  userCount: number
}

export const Dashboard = (props: DashboardProps) => {
  const { userCount } = props

  return (
    <AdminLayout title="Tableau de bord">
      <div class="flex wrap">
        <Card title="Nombre d'utilisateur">
          <h1 class="text-center mt-1">{userCount}</h1>
        </Card>
      </div>
    </AdminLayout>
  )
}
