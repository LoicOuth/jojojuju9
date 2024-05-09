import User from '#models/user'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { Role } from '#types/roles'
import { changeRoleValidator } from '#validators/user'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

export default class AdminUserchangeRoleController {
  async render({ request }: HttpContext) {
    const user = await User.findByOrFail('username', request.params().username)

    return <Admin.Users.ChangeRole user={user} />
  }

  @inject()
  async handle({ request, response }: HttpContext, toast: ToastService) {
    const user = await User.findOrFail(request.params().id)

    const {
      admin: isAdmin,
      moderator: isModerator,
      autor: isAutor,
    } = await changeRoleValidator.validate(request.all())

    const roles: Role[] = []

    if (isAdmin) {
      roles.push(Role.Admin)
    }
    if (isModerator) {
      roles.push(Role.Moderator)
    }
    if (isAutor) {
      roles.push(Role.Autor)
    }

    user.roles = roles
    await user.save()

    toast.success(`Les rôles de l'utilisateur ${user.username} ont été modifié`)

    return response.redirect().toRoute('admin.users')
  }
}
