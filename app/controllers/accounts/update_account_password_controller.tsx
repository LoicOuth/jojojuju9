import User from '#models/user'
import { Account } from '#pages/account/index'
import { ToastService } from '#services/toast.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class UpdateAccountPasswordController {
  static validator = vine.compile(
    vine.object({
      password: vine.string().minLength(8).confirmed(),
    })
  )

  async render({ request }: HttpContext) {
    const user = await User.findByOrFail('username', request.param('username'))

    return <Account.UpdatePassword user={user} />
  }

  @inject()
  async handle({ response, request }: HttpContext, toast: ToastService) {
    const user = await User.findOrFail(request.param('id'))
    const { password } = await request.validateUsing(UpdateAccountPasswordController.validator)

    await user.merge({ password }).save()

    toast.success('Votre mot de passe a été modifié')

    return response.redirect().toRoute('account', { username: user.username })
  }
}
