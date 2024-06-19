import Patch from '#models/patch'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class UpdatePatchController {
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

  async render({ request }: HttpContext) {
    const patch = await Patch.findOrFail(request.param('id'))

    return <Admin.Patchs.CreateUpdate patch={patch} />
  }

  @inject()
  async handle({ request, response }: HttpContext, toast: ToastService) {
    const patch = await Patch.findOrFail(request.param('id'))
    const { requiredDaemon, requiredUtorrent, requiredWinrar, ...validate } =
      await request.validateUsing(UpdatePatchController.validator)

    await patch
      .merge({
        ...validate,
        requiredDaemon: requiredDaemon ?? false,
        requiredUtorrent: requiredUtorrent ?? false,
        requiredWinrar: requiredWinrar ?? false,
      })
      .save()

    toast.success(`Le patch ${validate.program} a été modifié`)

    return response.redirect().toRoute('admin.patchs')
  }
}
