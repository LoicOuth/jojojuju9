import User from '#models/user'
import { Admin } from '#pages/admin/index'
import { HttpContext } from '@adonisjs/core/http'

export default class AdminGamesController {
  async render({ request }: HttpContext) {
    const page = request.qs().page || 1

    const usersQuery = User.query()

    if (request.qs().s) {
      usersQuery.where('username', 'like', `%${request.qs().s}%`)
    }

    const users = await usersQuery.paginate(page, 10)

    return <Admin.Users.Index users={users} />
  }
}
