import Setting from '#models/setting'
import Software from '#models/software'
import { ShowSoftwarePage } from '#pages/show_software'
import { SoftwaresPage } from '#pages/softwares'
import { ToastService } from '#services/toast.service'
import { SettingsCode } from '#types/settings'
import { Sort } from '#types/sort'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

export default class SoftwaresController {
  async render({ request, auth }: HttpContext) {
    await auth.check()
    const page = request.qs().page || 1

    const softwaresQuery = Software.query()

    if (request.qs().s) {
      softwaresQuery.where('name', 'like', `%${request.qs().s}%`)
    }

    if (request.qs().favorite === 'on' && auth.user) {
      await auth.user.load('favoriteSoftwares')
      softwaresQuery.whereIn(
        'id',
        auth.user.favoriteSoftwares.map((software) => software.id)
      )
    }

    switch (request.qs().sort as Sort) {
      case 'nameDesc':
        softwaresQuery.orderBy('name', 'desc')
        break
      case 'updatedAtAsc':
        softwaresQuery.orderBy('updatedAt', 'asc')
        break
      case 'updatedAtDesc':
        softwaresQuery.orderBy('updatedAt', 'desc')
        break
      default:
        softwaresQuery.orderBy('name', 'asc')
        break
    }

    const softwares = await softwaresQuery.withCount('comments').preload('kinds').paginate(page, 10)

    return <SoftwaresPage softwares={softwares} />
  }

  async show({ request }: HttpContext) {
    const software = await Software.findByOrFail('slug', request.param('slug'))

    await software.load('links')
    await software.load('kinds')

    const winrarLink = await Setting.findByOrFail('code', 'winrarLink' as SettingsCode)
    const utorrentLink = await Setting.findByOrFail('code', 'utorrentLink' as SettingsCode)
    const daemonLink = await Setting.findByOrFail('code', 'daemonLink' as SettingsCode)

    return (
      <ShowSoftwarePage
        software={software}
        winrarLink={winrarLink.stringValue || ''}
        utorrentLink={utorrentLink.stringValue || ''}
        daemonLink={daemonLink.stringValue || ''}
      />
    )
  }

  @inject()
  async toggleFavorite({ response, request, auth }: HttpContext, toast: ToastService) {
    const software = await Software.findOrFail(request.param('id'))

    if (!auth.user) {
      toast.error('Vous devez être connecté ')
      return response.redirect().toRoute('login.index')
    }

    await auth.user?.load('favoriteSoftwares')

    if (auth.user.isSoftwareInFavorite(software.id)) {
      await auth.user.related('favoriteSoftwares').detach([software.id])
    } else {
      await auth.user.related('favoriteSoftwares').attach([software.id])
    }

    return response.redirect().toRoute('softwares.show', { slug: software.slug })
  }
}
