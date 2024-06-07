import type { HttpContext } from '@adonisjs/core/http'
import { AuthPage } from '#pages/auth/index'
import User from '#models/user'
import { Database } from '@adonisjs/lucid/database'
import { FieldContext } from '@vinejs/vine/types'
import vine from '@vinejs/vine'

const checkUniqueField = async (db: Database, value: string, field: FieldContext) =>
  !(await db.from('users').where(field.name.toString(), value).first())

export default class RegisterController {
  static validator = vine.compile(
    vine.object({
      username: vine.string().unique(checkUniqueField),
      email: vine.string().email().unique(checkUniqueField),
      password: vine.string().minLength(8).confirmed(),
    })
  )

  render() {
    return <AuthPage.Register />
  }

  async handle({ request, response, auth }: HttpContext) {
    const { email, username, password } = await request.validateUsing(RegisterController.validator)

    const user = await User.create({
      email,
      username,
      password,
    })

    await auth.use('web').login(user)

    return response.redirect().toRoute('home')
  }
}
