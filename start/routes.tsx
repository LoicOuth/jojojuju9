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

const UpdateGamesController = () => import('#controllers/admin/games/update_game_controller')
const CreateGamesController = () => import('#controllers/admin/games/create_games_controller')
const AdminGamesController = () => import('#controllers/admin/games/admin_games_controller')
const LoginController = () => import('#controllers/auth/login_controller')
const LogoutController = () => import('#controllers/auth/logout_controller')
const RegisterController = () => import('#controllers/auth/register_controller')
const DashboardController = () => import('#controllers/admin/dashboard_controller')
const AdminUsersController = () => import('#controllers/admin/users/admin_users_controller')
const AdminUserChangeRoleController = () =>
  import('#controllers/admin/users/admin_user_change_role_controller')
const SettingsController = () => import('#controllers/admin/settings/admin_settings_controller')
const UpdateSettingsController = () =>
  import('#controllers/admin/settings/admin_setting_update_controller')
const AccountController = () => import('#controllers/accounts/accounts_controller')
const UpdateAccountController = () => import('#controllers/accounts/update_account_controller')
const UpdateAccountPasswordController = () =>
  import('#controllers/accounts/update_account_password_controller')

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

router.get('/account/:username', [AccountController, 'render']).as('account')
router.get('/account/:username/update', [UpdateAccountController, 'render']).as('account.edit')
router.post('/account/:id/update', [UpdateAccountController, 'handle']).as('account.update')
router
  .get('/account/:username/update-password', [UpdateAccountPasswordController, 'render'])
  .as('account.edit.password')
router
  .post('/account/:id/update-password', [UpdateAccountPasswordController, 'handle'])
  .as('account.update.password')

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
        router.get('games/update/:slug', [UpdateGamesController, 'render']).as('admin.games.edit')
        router.post('games/update/:id', [UpdateGamesController, 'handle']).as('admin.games.update')
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

        router.get('settings', [SettingsController, 'render']).as('admin.settings')
        router
          .get('settings/:code/edit', [UpdateSettingsController, 'render'])
          .as('admin.settings.edit')
        router
          .put('settings/:id/update', [UpdateSettingsController, 'handle'])
          .as('admin.settings.update')
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
