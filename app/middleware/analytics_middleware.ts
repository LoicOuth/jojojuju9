import DailyAnalytic from '#models/daily_analytic'
import { HttpContext } from '@adonisjs/core/http'
import { NextFn } from '@adonisjs/core/types/http'

export default class AutorMiddleware {
  async handle(ctx: HttpContext, next: NextFn) {
    await DailyAnalytic.firstOrCreate(
      {
        ip: ctx.request.ip(),
      },
      {
        ip: ctx.request.ip(),
      }
    )

    return next()
  }
}
