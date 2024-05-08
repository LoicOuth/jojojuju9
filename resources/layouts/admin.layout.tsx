import { Button } from '#components/button'
import { AdminMenuItem } from '#components/layouts/admin_menu_item'
import { MasterLayout } from '#layouts/master.layout'
import { route } from '#start/view'
import { HttpContext } from '@adonisjs/core/http'

interface AdminLayoutProps {
  title?: string
  children: JSX.Element
}

export const AdminLayout = async (props: AdminLayoutProps) => {
  const { children, title } = props
  const { auth } = await HttpContext.getOrFail()

  return (
    <MasterLayout title={title}>
      <div class="flex">
        <aside class="sidebar flex column justify-between">
          <nav class="flex column gap-3">
            {auth.user?.isAdmin() && (
              <AdminMenuItem
                title="Tableau de bord"
                href={route('admin.dashboard')}
                icon="fa-solid fa-chart-line"
              />
            )}

            {auth.user?.isAutor() && (
              <AdminMenuItem title="Jeux" href={route('admin.games')} icon="fa-solid fa-gamepad" />
            )}
          </nav>

          <Button href={route('home')} up-follow="false" icon="fa-solid fa-house" text="Accueil" />
        </aside>
        <main up-main class="max-width-wrapper py-5">
          {children}
        </main>
      </div>
    </MasterLayout>
  )
}
