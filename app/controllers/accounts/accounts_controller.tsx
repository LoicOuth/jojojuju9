import User from '#models/user'
import { Account } from '#pages/account/index'
import type { HttpContext } from '@adonisjs/core/http'

export default class AccountsController {
  async render({ request }: HttpContext) {
    const user = await User.findByOrFail('username', request.param('username'))

    return <Account.Index user={user} />
  }
}
