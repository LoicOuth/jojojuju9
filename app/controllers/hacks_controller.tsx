import Hack from '#models/hack'
import { HacksPage } from '#pages/hacks'
import { SettingsService } from '#services/settings.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

export default class HacksController {
  @inject()
  async render({ request }: HttpContext, settings: SettingsService) {
    const page = request.qs().page || 1

    const hacksQuery = Hack.query().orderBy('createdAt', 'desc')

    if (request.qs().s) {
      hacksQuery.where('game', 'like', `%${request.qs().s}%`)
    }

    const hacks = await hacksQuery.paginate(page, request.qs().size || 50)

    const links = await settings.getSoftwareLinks()

    return <HacksPage hacks={hacks} {...links} />
  }
}
