import Hack from '#models/hack'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class UpdateHackController {
  static validator = vine.compile(
    vine.object({
      game: vine.string(),
      type: vine.string(),
      youtube: vine.string().optional(),
      link: vine.string(),
      requiredUtorrent: vine.boolean().optional(),
      requiredWinrar: vine.boolean().optional(),
      requiredDaemon: vine.boolean().optional(),
    })
  )

  async render({ request }: HttpContext) {
    const hack = await Hack.findOrFail(request.param('id'))

    return <Admin.Hacks.CreateUpdate hack={hack} />
  }

  @inject()
  async handle({ request, response }: HttpContext, toast: ToastService) {
    const hack = await Hack.findOrFail(request.param('id'))
    const { requiredDaemon, requiredUtorrent, requiredWinrar, ...validate } =
      await request.validateUsing(UpdateHackController.validator)

    await hack
      .merge({
        ...validate,
        requiredDaemon: requiredDaemon ?? false,
        requiredUtorrent: requiredUtorrent ?? false,
        requiredWinrar: requiredWinrar ?? false,
      })
      .save()

    toast.success(`Le hack ${validate.game} a été modifié`)

    return response.redirect().toRoute('admin.hack')
  }
}
