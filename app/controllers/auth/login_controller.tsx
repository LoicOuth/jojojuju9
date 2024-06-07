import User from '#models/user'
import { AuthPage } from '#pages/auth/index'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class LoginController {
  static validator = vine.compile(
    vine.object({
      username: vine.string(),
      password: vine.string(),
    })
  )

  render() {
    return <AuthPage.Login />
  }

  async handle({ request, auth, response, session }: HttpContext) {
    const { username, password } = await request.validateUsing(LoginController.validator)

    const user = await User.verifyCredentials(username, password)

    if (!user.isActive) {
      session.flashErrors({
        inactive: 'Votre compte est inactif',
      })

      return response.redirect().back()
    }

    await auth.use('web').login(user)

    return response.redirect('/')
  }
}
