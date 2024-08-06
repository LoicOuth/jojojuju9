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
  const { auth, session, request } = await HttpContext.getOrFail()

  const successMessage = session.flashMessages.get('success')?.message

  return (
    <MasterLayout title={`Administration - ${title}`}>
      <div class="flex">
        <aside class="sidebar flex column justify-between">
          <nav class="flex column gap-3">
            {auth.user?.isAdmin() ? (
              <>
                <div style="position: relative">
                  <AdminMenuItem
                    title="Validé"
                    href={route('admin.validate')}
                    icon="fa-regular fa-circle-check"
                  />

                  <div
                    id="unvalidated-number"
                    up-source="/admin/unvalidated-number"
                    load-fragment
                  />
                </div>

                <AdminMenuItem
                  title="Tableau de bord"
                  href={route('admin.dashboard')}
                  icon="fa-solid fa-chart-line"
                />
                <AdminMenuItem
                  title="Utilisateurs"
                  href={route('admin.users')}
                  icon="fa-solid fa-users"
                />
                <AdminMenuItem
                  title="Paramètres"
                  href={route('admin.settings')}
                  icon="fa-solid fa-gear"
                />
              </>
            ) : (
              ''
            )}

            {auth.user?.isAutor() && (
              <>
                <AdminMenuItem
                  title="Jeux"
                  href={route('admin.games')}
                  icon="fa-solid fa-gamepad"
                />
                <AdminMenuItem
                  title="Logiciels"
                  href={route('admin.softwares')}
                  icon="fa-solid fa-compact-disc"
                />
                <AdminMenuItem title="FAQ" href={route('admin.faq')} icon="fa-solid fa-question" />
                <AdminMenuItem
                  title="Hacks"
                  href={route('admin.hack')}
                  icon="fa-solid fa-microchip"
                />
                <AdminMenuItem
                  title="Patchs/Fixs/Astuces"
                  href={route('admin.patchs')}
                  icon="fa-solid fa-gears"
                />
              </>
            )}
          </nav>

          <Button href={route('home')} up-follow="false" icon="fa-solid fa-house" text="Accueil" />
        </aside>
        <main up-main class="admin-main">
          {successMessage && <div class="toast">{successMessage}</div>}
          <div class="max-width-wrapper pt-5 pb-10">
            <div class="flex items-end mb-10" admin-header>
              {returnHref || request.qs().from === 'validate' ? (
                <ButtonIcon
                  icon="fa-solid fa-arrow-left"
                  href={request.qs().from === 'validate' ? route('admin.validate') : returnHref}
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
