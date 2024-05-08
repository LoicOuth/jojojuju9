import { Button } from '#components/button'
import { AdminLayout } from '#layouts/admin.layout'
import { route } from '#start/view'

export const AdminGamesPage = () => {
  return (
    <AdminLayout title="Jeux">
      <Button text="Ajouter un jeu" href={route('admin.games.create')} icon="fa-solid fa-plus" />
    </AdminLayout>
  )
}
