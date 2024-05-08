import User from '#models/user'
import { Admin } from '#pages/admin/index'
import { HttpContext } from '@adonisjs/core/http'

export default class AdminUsersController {
  async render({ request }: HttpContext) {
    const page = request.qs().page || 1

    const usersQuery = User.query()

    if (request.qs().s) {
      usersQuery.where('username', 'like', `%${request.qs().s}%`)
    }

    const users = await usersQuery.orderBy('username').paginate(page, 10)

    return <Admin.Users.Index users={users} />
  }

  async handleBan({ request, response }: HttpContext) {
    const isActive = request.only(['active']).active === 'on'
    const user = await User.findOrFail(request.params().id)

    user.isActive = isActive
    await user.save()

    return response.redirect().toRoute('admin.users')
  }
}
