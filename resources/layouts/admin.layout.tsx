import { Button, ButtonIcon } from '#components/button'
import { AdminMenuItem } from '#components/layouts/admin_menu_item'
import { MasterLayout } from '#layouts/master.layout'
import { route } from '#start/view'
import { HttpContext } from '@adonisjs/core/http'

interface AdminLayoutProps {
  title?: string
  returnHref?: string
  children: JSX.Element
}

export const AdminLayout = async (props: AdminLayoutProps) => {
  const { children, title, returnHref } = props
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
              <>
                <AdminMenuItem
                  title="Jeux"
                  href={route('admin.games')}
                  icon="fa-solid fa-gamepad"
                />
                <AdminMenuItem
                  title="Utilisateurs"
                  href={route('admin.users')}
                  icon="fa-solid fa-users"
                />
              </>
            )}
          </nav>

          <Button href={route('home')} up-follow="false" icon="fa-solid fa-house" text="Accueil" />
        </aside>
        <main up-main class="admin-main">
          <div class="max-width-wrapper pt-5 pb-10">
            <div class="flex items-end mb-10">
              {returnHref ? (
                <ButtonIcon
                  icon="fa-solid fa-arrow-left"
                  href={returnHref}
                  size="lg"
                  class="mr-5"
                />
              ) : (
                ''
              )}
              <h1 class="underline">{title}</h1>
            </div>
            {children}
          </div>
        </main>
      </div>
    </MasterLayout>
  )
}
