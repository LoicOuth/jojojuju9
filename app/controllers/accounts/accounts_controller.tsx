import User from '#models/user'
import { Account } from '#pages/account/index'
import { cuid } from '@adonisjs/core/helpers'
import type { HttpContext } from '@adonisjs/core/http'

export default class AccountsController {
  async render({ request }: HttpContext) {
    const user = await User.findByOrFail('username', request.param('username'))

    return <Account.Index user={user} />
  }

  async delete({ request, response, auth }: HttpContext) {
    const user = await User.findOrFail(request.param('id'))
    const anonymousUser = cuid()

    await user
      .merge({
        avatar: null,
        username: anonymousUser,
        email: `${anonymousUser}@anonymous.com`,
        password: '',
        isActive: false,
      })
      .save()

    await auth.use('web').logout()

    return response.redirect().toRoute('home')
  }
}
