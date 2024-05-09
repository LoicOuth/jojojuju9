import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

@inject()
export class ToastService {
  constructor(private context: HttpContext) {}

  success(message: string) {
    this.context.session.flash('success', {
      message,
    })
  }

  error(message: string) {
    this.context.session.flash('error', {
      message,
    })
  }
}
