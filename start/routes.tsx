/*
|--------------------------------------------------------------------------
| Routes file
|--------------------------------------------------------------------------
|
| The routes file is used for defining the HTTP routes.
|
*/

import router from '@adonisjs/core/services/router'
import { middleware } from '#start/kernel'
import { ErrorPage } from '#pages/errors/index'
import { TermsConditionsPage } from '#pages/terms_conditions'

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
const GamesController = () => import('#controllers/games_controller')
const HomeController = () => import('#controllers/home_controller')
const CommentsController = () => import('#controllers/api/comments_controller')
const ResponsesController = () => import('#controllers/api/responses_controller')
const UpdateVersionGameController = () =>
  import('#controllers/admin/games/update_version_game_controller')
const UpdateSoftwaresController = () =>
  import('#controllers/admin/softwares/update_software_controller')
const CreateSoftwaresController = () =>
  import('#controllers/admin/softwares/create_software_controller')
const AdminSoftwaresController = () =>
  import('#controllers/admin/softwares/admin_softwares_controller')
const SoftwaresController = () => import('#controllers/softwares_controller')
const UpdateVersionSoftwaresController = () =>
  import('#controllers/admin/softwares/update_version_softwares_controller')
const FaqController = () => import('#controllers/faq_controller')
const ContactController = () => import('#controllers/contact_controller')

router.get('/', [HomeController, 'render']).as('home')
router.get('/faq', [FaqController, 'render']).as('faq')
router.get('/contact', [ContactController, 'render']).as('contact')
router.post('/contact', [ContactController, 'handle']).as('contact.send')

router.get('/terms-and-conditions', () => <TermsConditionsPage />).as('termsConditions')

/*
|--------------------------------|
|             Account            |
|--------------------------------|
*/
router.get('/account/:username', [AccountController, 'render']).as('account')
router.get('/account/:username/update', [UpdateAccountController, 'render']).as('account.edit')
router.post('/account/:id/update', [UpdateAccountController, 'handle']).as('account.update')
router
  .get('/account/:username/update-password', [UpdateAccountPasswordController, 'render'])
  .as('account.edit.password')
router
  .post('/account/:id/update-password', [UpdateAccountPasswordController, 'handle'])
  .as('account.update.password')
router.delete('/account/:id', [AccountController, 'delete']).as('account.delete')

/*
|--------------------------------|
|             Games              |
|--------------------------------|
*/
router.get('/games', [GamesController, 'render']).as('games')
router.get('/games/:slug', [GamesController, 'show']).as('games.show')
router
  .put('/games/:id', [GamesController, 'toggleFavorite'])
  .as('games.favorite')
  .middleware([middleware.auth()])

/*
|--------------------------------|
|             Softwares          |
|--------------------------------|
*/
router.get('/softwares', [SoftwaresController, 'render']).as('softwares')
router.get('/softwares/:slug', [SoftwaresController, 'show']).as('softwares.show')
router
  .put('/softwares/:id', [SoftwaresController, 'toggleFavorite'])
  .as('softwares.favorite')
  .middleware([middleware.auth()])

/*
|--------------------------------|
|             Comments           |
|--------------------------------|
*/
router
  .group(() => {
    router.get('/games/:id/comments', [CommentsController, 'gameComments'])
    router.get('/softwares/:id/comments', [CommentsController, 'softwareComments'])

    router.post('/comments', [CommentsController, 'create']).middleware([middleware.auth()])
    router.put('/comments/:id', [CommentsController, 'update']).middleware([middleware.auth()])
    router.delete('/comments/:id', [CommentsController, 'delete']).middleware([middleware.auth()])
  })
  .prefix('/api')

/*
|--------------------------------|
|             Responses          |
|--------------------------------|
*/
router
  .group(() => {
    router.post('/responses', [ResponsesController, 'create']).middleware([middleware.auth()])
    router.put('/responses/:id', [ResponsesController, 'update']).middleware([middleware.auth()])
    router.delete('/responses/:id', [ResponsesController, 'delete']).middleware([middleware.auth()])
  })
  .prefix('/api')

router
  .group(() => {
    router
      .get('dashboard', [DashboardController, 'render'])
      .as('admin.dashboard')
      .use([middleware.admin()])

    router
      .group(() => {
        /*
        |--------------------------------|
        |             Games              |
        |--------------------------------|
        */
        router.get('games', [AdminGamesController, 'render']).as('admin.games')
        router.delete('games/:id', [AdminGamesController, 'delete']).as('admin.games.delete')
        router.get('games/create', [CreateGamesController, 'render']).as('admin.games.create')
        router.post('games/store', [CreateGamesController, 'handle']).as('admin.games.store')
        router.get('games/update/:slug', [UpdateGamesController, 'render']).as('admin.games.edit')
        router.put('games/update/:id', [UpdateGamesController, 'handle']).as('admin.games.update')
        router
          .get('games/version/update', [UpdateVersionGameController, 'render'])
          .as('admin.games.version.edit')
        router
          .put('games/version/update', [UpdateVersionGameController, 'handle'])
          .as('admin.games.version.update')

        /*
        |--------------------------------|
        |             Softwares          |
        |--------------------------------|
        */
        router.get('softwares', [AdminSoftwaresController, 'render']).as('admin.softwares')
        router
          .delete('softwares/:id', [AdminSoftwaresController, 'delete'])
          .as('admin.softwares.delete')
        router
          .get('softwares/create', [CreateSoftwaresController, 'render'])
          .as('admin.softwares.create')
        router
          .post('softwares/store', [CreateSoftwaresController, 'handle'])
          .as('admin.softwares.store')
        router
          .get('softwares/update/:slug', [UpdateSoftwaresController, 'render'])
          .as('admin.softwares.edit')
        router
          .put('softwares/update/:id', [UpdateSoftwaresController, 'handle'])
          .as('admin.softwares.update')
        router
          .get('softwares/version/update', [UpdateVersionSoftwaresController, 'render'])
          .as('admin.softwares.version.edit')
        router
          .put('softwares/version/update', [UpdateVersionSoftwaresController, 'handle'])
          .as('admin.softwares.version.update')
      })
      .use([middleware.autor()])

    router
      .group(() => {
        /*
        |--------------------------------|
        |             Users              |
        |--------------------------------|
        */
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
