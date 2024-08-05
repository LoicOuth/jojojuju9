import Patch from '#models/patch'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { inject } from '@adonisjs/core'
import { assertExists } from '@adonisjs/core/helpers/assert'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class CreatePatchController {
  static validator = vine.compile(
    vine.object({
      program: vine.string(),
      type: vine.string(),
      youtube: vine.string().optional(),
      link: vine.string(),
      requiredUtorrent: vine.boolean().optional(),
      requiredWinrar: vine.boolean().optional(),
      requiredDaemon: vine.boolean().optional(),
    })
  )

  render() {
    return <Admin.Patchs.CreateUpdate />
  }

  @inject()
  async handle({ request, response, auth }: HttpContext, toast: ToastService) {
    const validation = await request.validateUsing(CreatePatchController.validator)
    assertExists(auth.user, 'User is not authenticated')

    await Patch.create({
      ...validation,
      createdById: auth.user.id,
      isValidated: auth.user.isAdmin(),
    })

    toast.success(`Le patch ${validation.program} a été créé`)

    return response.redirect().toRoute('admin.patchs')
  }
}
