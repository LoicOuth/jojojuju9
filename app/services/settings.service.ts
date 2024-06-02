import Setting from '#models/setting'
import { SettingsCode } from '#types/settings'

export class SettingsService {
  async getSoftwareLinks() {
    const winrarLink = await Setting.findByOrFail('code', 'winrarLink' as SettingsCode)
    const utorrentLink = await Setting.findByOrFail('code', 'utorrentLink' as SettingsCode)
    const daemonLink = await Setting.findByOrFail('code', 'daemonLink' as SettingsCode)

    return {
      winrarLink: winrarLink.stringValue || '',
      utorrentLink: utorrentLink.stringValue || '',
      daemonLink: daemonLink.stringValue || '',
    }
  }
}
