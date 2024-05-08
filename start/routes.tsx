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
const CreateGamesController = () => import('#controllers/admin/games/create_games_controller')
const AdminGamesController = () => import('#controllers/admin/games/admin_games_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const DashboardController = () => import('#controllers/admin/dashboard_controller')
const AdminUsersController = () => import('#controllers/admin/users/admin_users_controller')
const AdminUserChangeRoleController = () =>
  import('#controllers/admin/users/admin_user_change_role_controller')

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
        router.delete('games/:id', [AdminGamesController, 'delete']).as('admin.games.delete')
        router.get('games/create', [CreateGamesController, 'render']).as('admin.games.create')
        router.post('games/store', [CreateGamesController, 'handle']).as('admin.games.store')
      })
      .use([middleware.autor()])

    router
      .group(() => {
        router.get('users', [AdminUsersController, 'render']).as('admin.users')
        router
          .get('users/:username/roles', [AdminUserChangeRoleController, 'render'])
          .as('admin.users.role')
        router
          .put('users/:id/roles', [AdminUserChangeRoleController, 'handle'])
          .as('admin.users.role.update')
        router.put('users/:id/ban', [AdminUsersController, 'handleBan']).as('admin.users.ban')
      })
      .use([middleware.admin()])
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
