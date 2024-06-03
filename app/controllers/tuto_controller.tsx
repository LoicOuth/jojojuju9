import { TutoPage } from '#pages/tuto'
import { SettingsService } from '#services/settings.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

export default class TutoController {
  @inject()
  async render(_: HttpContext, settings: SettingsService) {
    const links = await settings.getSoftwareLinks()

    return <TutoPage {...links} />
  }
}
