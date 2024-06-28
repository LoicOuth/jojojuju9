import Setting from '#models/setting'
import { Admin } from '#pages/admin/index'
import type { HttpContext } from '@adonisjs/core/http'

export default class AdminSettingsController {
  async render({ request }: HttpContext) {
    const page = request.qs().page || 1

    const settingsQuery = Setting.query()

    if (request.qs().s) {
      settingsQuery.where('name', 'like', `%${request.qs().s}%`)
    }

    const settings = await settingsQuery.orderBy('name').paginate(page, request.qs().size || 50)

    return <Admin.Settings.Index settings={settings} />
  }
}
