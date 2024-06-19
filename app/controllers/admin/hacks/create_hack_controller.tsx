import Hack from '#models/hack'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class CreateHackController {
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

  render() {
    return <Admin.Hacks.CreateUpdate />
  }

  @inject()
  async handle({ request, response }: HttpContext, toast: ToastService) {
    const validation = await request.validateUsing(CreateHackController.validator)

    await Hack.create({ ...validation })

    toast.success(`Le hack ${validation.game} a été créé`)

    return response.redirect().toRoute('admin.hack')
  }
}
