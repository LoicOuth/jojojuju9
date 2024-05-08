import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class AdminMiddleware {
  redirectTo = '/403'

  async handle(ctx: HttpContext, next: NextFn) {
    if (ctx.auth.user?.isAdmin()) {
      return next()
    }

    ctx.response.redirect(this.redirectTo, true)
  }
}
