import User from '#models/user'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

export default class AdminUsersController {
  async render({ request }: HttpContext) {
    const page = request.qs().page || 1

    const usersQuery = User.query().orderBy('username')

    if (request.qs().s) {
      usersQuery.where('username', 'like', `%${request.qs().s}%`)
    }

    const users =
      request.qs().size === 'all'
        ? await usersQuery
        : await usersQuery.paginate(page, request.qs().size || 50)

    return <Admin.Users.Index users={users} />
  }

  @inject()
  async handleBan({ request, response }: HttpContext, toast: ToastService) {
    const isActive = request.only(['active']).active === 'on'
    const user = await User.findOrFail(request.params().id)

    user.isActive = isActive
    await user.save()

    toast.success(`L'utilisateur ${user.username} a été ${isActive ? 'débannis' : 'bannis'}`)

    return response.redirect().toRoute('admin.users')
  }
}
