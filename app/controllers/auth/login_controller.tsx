import User from '#models/user'
import { AuthPage } from '#pages/auth/index'
import { loginValidator } from '#validators/auth/login'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  render() {
    return <AuthPage.Login />
  }

  async handle({ request, auth, response, session }: HttpContext) {
    const { username, password } = await loginValidator.validate(request.all())

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
