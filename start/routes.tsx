/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { HomePage } from '#pages/home'
import { AboutPage } from '#pages/about'
import { middleware } from '#start/kernel'
import { ErrorPage } from '#pages/errors/index'
const CreateGamesController = () => import('#controllers/admin/create_games_controller')
const AdminGamesController = () => import('#controllers/admin/admin_games_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const DashboardController = () => import('#controllers/admin/dashboard_controller')

router
  .get('/', () => {
    return <HomePage />
  })
  .as('home')
router
  .get('/about', () => {
    return <AboutPage />
  })
  .as('about')

router
  .group(() => {
    router
      .get('dashboard', [DashboardController, 'render'])
      .as('admin.dashboard')
      .use([middleware.admin()])

    router
      .group(() => {
        router.get('games', [AdminGamesController, 'render']).as('admin.games')
        router.get('games/create', [CreateGamesController, 'render']).as('admin.games.create')
        router.post('games/store', [CreateGamesController, 'handle']).as('admin.games.store')
      })
      .use([middleware.autor()])
  })
  .prefix('/admin')
  .use([middleware.auth()])

router.get('/login', [LoginController, 'render']).as('login.index')
router.post('/login', [LoginController, 'handle']).as('login.store')
router.get('/register', [RegisterController, 'render']).as('register.index')
router.post('/register', [RegisterController, 'handle']).as('register.store')
router.post('/logout', [LogoutController, 'handle']).as('logout').use(middleware.auth())

//Error pages

router.get('/403', () => <ErrorPage.Forbidden />).as('error.forbidden')
