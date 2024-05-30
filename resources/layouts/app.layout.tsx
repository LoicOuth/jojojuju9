import { Button } from '#components/button'
import { Vite, csrfField, route } from '#start/view'
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
        <nav id="burger-menu" class="flex column gap-5 header__burger p-5">
          <a href={route('home')} class="mr-10">
            <Vite.Image
              src="resources/assets/images/jojojuju9_logo.png"
              alt="logo"
              class="header__logo"
            />
          </a>

          <a href={route('home')} class="header__link">
            Accueil
          </a>
          <a href={route('games')} class="header__link">
            Jeux
          </a>
          <a href={route('softwares')} class="header__link">
            Logiciels
          </a>
        </nav>

        <header class="header">
          <nav class="header__navigation flex items-center gap-5">
            <a href={route('home')} class="mr-10">
              <Vite.Image
                src="resources/assets/images/jojojuju9_logo.png"
                alt="logo"
                class="header__logo"
              />
            </a>

            <a href={route('home')} class="header__link">
              Accueil
            </a>
            <a href={route('games')} class="header__link">
              Jeux
            </a>
            <a href={route('softwares')} class="header__link">
              Logiciels
            </a>
          </nav>
          <div class="header__navigation--mobile">
            <i id="burger-btn" class="fa-solid fa-bars" />
          </div>
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
        <footer class="footer">
          <div class="max-width-wrapper flex py-10">
            <div class="flex-1 flex column">
              <div class="flex items-center">
                <a href={route('home')}>
                  <Vite.Image
                    src="resources/assets/images/jojojuju9_logo.png"
                    alt="logo"
                    class="footer__logo mr-3"
                  />
                </a>

                <h5>Jojojuju9 Crack & hack 🕹️</h5>
              </div>
              <div class="flex items-center gap-5 mt-5">
                <a href="https://www.facebook.com/Jojojuju9CrackHack/" target="_blank">
                  <i class="fa-brands fa-facebook footer__brand-icon" />
                </a>
                <a href="https://www.instagram.com/jojojuju9crack/" target="_blank">
                  <i class="fa-brands fa-instagram footer__brand-icon" />
                </a>
                <a href="https://discord.gg/wNzk4fBHWs" target="_blank">
                  <i class="fa-brands fa-discord footer__brand-icon" />
                </a>
                <a href="https://www.youtube.com/channel/UCLN3cGA25TeIiroskBjVWSg" target="_blank">
                  <i class="fa-brands fa-youtube footer__brand-icon" />
                </a>
                <a href="https://www.snapchat.com/add/jojojuju9crack" target="_blank">
                  <i class="fa-brands fa-snapchat footer__brand-icon" />
                </a>
                <a href="https://twitter.com/Jojojuju9Crack" target="_blank">
                  <i class="fa-brands fa-x-twitter footer__brand-icon" />
                </a>
              </div>
              <span class="text-caption mt-5">© Jojojuju9 Crack & Hack</span>
            </div>
            <div class="flex-1 flex justify-end footer__link-container">
              <div class="flex column gap-3">
                <span>Informations</span>
                <a href={route('faq')} class="footer__link-container__link">
                  FAQ
                </a>
                <a href={route('termsConditions')} class="footer__link-container__link">
                  Termes et conditions d'utilisations
                </a>
                <a href={route('contact')} class="footer__link-container__link">
                  Me contacter
                </a>
              </div>
            </div>
          </div>
        </footer>
      </>
    </MasterLayout>
  )
}
