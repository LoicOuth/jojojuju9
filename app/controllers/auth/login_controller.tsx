import User from '#models/user'
import { AuthPage } from '#pages/auth/index'
import { loginValidator } from '#validators/auth/login'
import type { HttpContext } from '@adonisjs/core/http'

export default class LoginController {
  render() {
    return <AuthPage.Login />
  }

  async handle({ request, auth, response }: HttpContext) {
    const { username, password } = await loginValidator.validate(request.all())

    const user = await User.verifyCredentials(username, password)

    await auth.use('web').login(user)

    return response.redirect('/')
  }
}
