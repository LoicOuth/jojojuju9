import { Button } from '#components/button'
import { Vite, csrfField, route } from '#start/view'
import { MasterLayout } from '#layouts/master.layout'
import { HttpContext } from '@adonisjs/core/http'
import { Avatar } from '#components/avatar'
import { ThemeCookieKey, Themes } from '#types/common'

interface AppLayoutProps {
  title?: string
  children: JSX.Element
}

export const AppLayout = async (props: AppLayoutProps) => {
  const { title, children } = props
  const { auth, session, request } = HttpContext.getOrFail()
  await auth.check()

  const theme = request.plainCookie(ThemeCookieKey, Themes.Light) as Themes
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
          <a href={route('hacks')} class="header__link">
            Hacks
          </a>
          <a href={route('patchs')} class="header__link">
            Patchs/Fixs/Astuces
          </a>
          <a href={route('faq')} class="header__link ">
            FAQ
          </a>
          <a href={route('tuto')} class="header__link ">
            Tutoriels
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

            <div class="header__dropdown">
              <span>
                Cracks & Hacks
                <i class="fa-solid fa-chevron-down ml-3"></i>
              </span>
              <div class="header__dropdown__content flex column gap-2">
                <a href={route('games')} class="header__link w-full">
                  Jeux
                </a>
                <a href={route('softwares')} class="header__link w-full">
                  logiciels
                </a>
                <a href={route('hacks')} class="header__link w-full">
                  Hacks
                </a>
                <a href={route('patchs')} class="header__link w-full">
                  Patchs/Fixs/Astuces
                </a>
              </div>
            </div>

            <div class="header__dropdown">
              <span>
                Informations
                <i class="fa-solid fa-chevron-down ml-3"></i>
              </span>
              <div class="header__dropdown__content flex column gap-2">
                <a href={route('faq')} class="header__link w-full">
                  FAQ
                </a>
                <a href={route('tuto')} class="header__link w-full">
                  Tutoriels
                </a>
              </div>
            </div>
          </nav>
          <div class="header__navigation--mobile">
            <i id="burger-btn" class="fa-solid fa-bars" />
          </div>
          <div class="flex items-center">
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

            <form action={`${route('theme.change')}?_method=PUT`} method="POST" up-target="html">
              {csrfField()}
              <button type="submit" class="ml-3 mt-1 theme-btn">
                {theme === Themes.Dark ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                    <path d="M375.7 19.7c-1.5-8-6.9-14.7-14.4-17.8s-16.1-2.2-22.8 2.4L256 61.1 173.5 4.2c-6.7-4.6-15.3-5.5-22.8-2.4s-12.9 9.8-14.4 17.8l-18.1 98.5L19.7 136.3c-8 1.5-14.7 6.9-17.8 14.4s-2.2 16.1 2.4 22.8L61.1 256 4.2 338.5c-4.6 6.7-5.5 15.3-2.4 22.8s9.8 13 17.8 14.4l98.5 18.1 18.1 98.5c1.5 8 6.9 14.7 14.4 17.8s16.1 2.2 22.8-2.4L256 450.9l82.5 56.9c6.7 4.6 15.3 5.5 22.8 2.4s12.9-9.8 14.4-17.8l18.1-98.5 98.5-18.1c8-1.5 14.7-6.9 17.8-14.4s2.2-16.1-2.4-22.8L450.9 256l56.9-82.5c4.6-6.7 5.5-15.3 2.4-22.8s-9.8-12.9-17.8-14.4l-98.5-18.1L375.7 19.7zM269.6 110l65.6-45.2 14.4 78.3c1.8 9.8 9.5 17.5 19.3 19.3l78.3 14.4L402 242.4c-5.7 8.2-5.7 19 0 27.2l45.2 65.6-78.3 14.4c-9.8 1.8-17.5 9.5-19.3 19.3l-14.4 78.3L269.6 402c-8.2-5.7-19-5.7-27.2 0l-65.6 45.2-14.4-78.3c-1.8-9.8-9.5-17.5-19.3-19.3L64.8 335.2 110 269.6c5.7-8.2 5.7-19 0-27.2L64.8 176.8l78.3-14.4c9.8-1.8 17.5-9.5 19.3-19.3l14.4-78.3L242.4 110c8.2 5.7 19 5.7 27.2 0zM256 368a112 112 0 1 0 0-224 112 112 0 1 0 0 224zM192 256a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path d="M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" />
                  </svg>
                )}
              </button>
            </form>
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

                <h5>Jojojuju9 Crack&Hack 🕹️</h5>
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
                <a href={route('contact')}>
                  <i class="fa-solid fa-envelope footer__brand-icon" />
                </a>
              </div>
              <span class="text-caption mt-5">© Jojojuju9 Crack&Hack</span>
            </div>
            <div class="flex-1 flex justify-end footer__link-container">
              <div class="flex column gap-3">
                <strong>A propos</strong>
                <a href={route('termsConditions')} class="footer__link-container__link">
                  Termes et conditions d'utilisations
                </a>
                <a href={route('contact')} class="footer__link-container__link">
                  Me contacter
                </a>
                <div id="visits" up-source="/visits" load-fragment />
              </div>
            </div>
          </div>
        </footer>
      </>
    </MasterLayout>
  )
}
