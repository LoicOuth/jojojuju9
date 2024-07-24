import User from '#models/user'
import { Account } from '#pages/account/index'
import { ToastService } from '#services/toast.service'
import { inject } from '@adonisjs/core'
import { cuid } from '@adonisjs/core/helpers'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import vine from '@vinejs/vine'
import { unlinkSync } from 'fs'

export default class UpdateAccountController {
  static validator = vine.compile(
    vine.object({
      username: vine
        .string()
        .regex(/^[a-zA-Z0-9_-]+$/)
        .unique(
          async (db, value, field) =>
            !(await db.from('users').whereNot('id', field.meta.id).where('username', value).first())
        ),
      email: vine.string().email(),
      avatar: vine.file({ extnames: ['png', 'jpg', 'jpeg'], size: '20mb' }).optional(),
    })
  )

  async render({ request }: HttpContext) {
    const user = await User.findByOrFail('username', request.param('username'))

    return <Account.Update user={user} />
  }

  @inject()
  async handle({ response, request }: HttpContext, toast: ToastService) {
    let user = await User.findOrFail(request.param('id'))
    const { avatar, email, username } = await request.validateUsing(
      UpdateAccountController.validator,
      {
        meta: { id: user.id },
      }
    )

    if (avatar) {
      if (user.avatar) {
        unlinkSync(app.makePath(`public/${user.avatar}`))
      }
      await avatar.move(app.makePath('public/uploads/users'), {
        name: `${cuid()}.${avatar.extname}`,
      })
    }

    user = await user
      .merge({
        email,
        username,
        avatar: avatar ? `/uploads/users/${avatar.fileName}` : user.avatar,
      })
      .save()

    toast.success('Votre compte a été modifié')

    return response.redirect().toRoute('account', { username: user.username })
  }
}
