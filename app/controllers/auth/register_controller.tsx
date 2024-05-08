import type { HttpContext } from '@adonisjs/core/http'
import { AuthPage } from '#pages/auth/index'
import { registerValidator } from '#validators/auth/register'
import User from '#models/user'

export default class RegisterController {
  render() {
    return <AuthPage.Register />
  }

  async handle({ request, response, auth }: HttpContext) {
    const { email, username, password } = await registerValidator.validate(request.all())

    const user = await User.create({
      email,
      username,
      password,
    })

    await auth.use('web').login(user)

    return response.redirect().toRoute('home')
  }
}
