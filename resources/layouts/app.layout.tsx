import { Button } from '#components/button'
import { csrfField, route } from '#start/view'
import { MasterLayout } from '#layouts/master.layout'
import { HttpContext } from '@adonisjs/core/http'
import { Avatar } from '#components/avatar'

interface AppLayoutProps {
  title?: string
  children: JSX.Element
}

export const AppLayout = async (props: AppLayoutProps) => {
  const { title, children } = props
  const { auth, session } = HttpContext.getOrFail()
  await auth.check()

  const successMessage = session.flashMessages.get('success')?.message

  return (
    <MasterLayout title={title}>
      <>
        <header class="header">
          <nav class="flex items-center gap-5">
            <a href={route('home')} class="header__link">
              Accueil
            </a>
            <a href={route('games')} class="header__link">
              Jeux
            </a>
          </nav>
          <div>
            {auth.isAuthenticated && auth.user ? (
              <div class="flex items-center">
                <jojo-menu>
                  <div slot="button">
                    <Avatar user={auth.user} />
                  </div>
                  <>
                    {auth.user?.isAdmin() || auth.user?.isAutor() ? (
                      <jojo-menu-item
                        text="Administration"
                        icon="fa-solid fa-gear"
                        href={auth.user.isAdmin() ? route('admin.dashboard') : route('admin.games')}
                        disabled-up-follow="true"
                      />
                    ) : (
                      ''
                    )}

                    <jojo-menu-item
                      text="Mon compte"
                      icon="fa-solid fa-user-gear"
                      href={route('account', { username: auth.user.username })}
                    />

                    <jojo-menu-item
                      text="Se déconnecter"
                      action={route('logout')}
                      icon="fa-solid fa-right-from-bracket"
                      iconColor="red"
                      csrfield={csrfField()}
                    />
                  </>
                </jojo-menu>
              </div>
            ) : (
              <Button
                href={route('login.index')}
                text="Se connecter"
                up-layer="new"
                up-accept-location="/"
                up-on-accepted="up.render('body', { response: event.response })"
              />
            )}
          </div>
        </header>
        <main class="app_main" up-main>
          <>
            {successMessage && <div class="toast">{successMessage}</div>}
            {children}
          </>
        </main>
      </>
    </MasterLayout>
  )
}
