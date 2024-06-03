import Patch from '#models/patch'
import { PatchsPage } from '#pages/patchs'
import { SettingsService } from '#services/settings.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

export default class PatchsController {
  @inject()
  async render({ request }: HttpContext, settings: SettingsService) {
    const page = request.qs().page || 1

    const patchsQuery = Patch.query().orderBy('createdAt', 'desc')

    if (request.qs().s) {
      patchsQuery.where('game', 'like', `%${request.qs().s}%`)
    }

    const patchs = await patchsQuery.paginate(page, 10)

    const links = await settings.getSoftwareLinks()

    return <PatchsPage patchs={patchs} {...links} />
  }
}
