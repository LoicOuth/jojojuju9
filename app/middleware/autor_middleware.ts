import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class AutorMiddleware {
  redirectTo = '/403'

  async handle(ctx: HttpContext, next: NextFn) {
    if (ctx.auth.user?.isAutor()) {
      return next()
    }

    ctx.response.redirect(this.redirectTo, true)
  }
}
