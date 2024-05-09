import Setting from '#models/setting'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { inject } from '@adonisjs/core'
import type { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class AdminUpdateSettingsController {
  static validator = vine.compile(
    vine.object({ stringValue: vine.string().optional(), decimalValue: vine.number().optional() })
  )

  async render({ request }: HttpContext) {
    const setting = await Setting.findByOrFail('code', request.params().code)

    return <Admin.Settings.Update setting={setting} />
  }

  @inject()
  async handle({ request, response }: HttpContext, toast: ToastService) {
    const setting = await Setting.findOrFail(request.params().id)
    const { decimalValue, stringValue } = await request.validateUsing(
      AdminUpdateSettingsController.validator
    )

    if (setting.stringValue && stringValue) {
      setting.stringValue = stringValue
    } else if (setting.decimalValue && decimalValue) {
      setting.decimalValue = decimalValue
    }

    await setting.save()

    toast.success(`Le paramètre ${setting.name} a été modifié`)

    return response.redirect().toRoute('admin.settings')
  }
}
