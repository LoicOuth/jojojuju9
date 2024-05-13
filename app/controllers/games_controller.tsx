import Game from '#models/game'
import Setting from '#models/setting'
import { GamesPage } from '#pages/games'
import { ShowGamePage } from '#pages/show_game'
import { ToastService } from '#services/toast.service'
import { SettingsCode } from '#types/settings'
import { Sort } from '#types/sort'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

export default class GamesController {
  async render({ request }: HttpContext) {
    const page = request.qs().page || 1

    const gamesQuery = Game.query()

    if (request.qs().s) {
      gamesQuery.where('name', 'like', `%${request.qs().s}%`)
    }

    switch (request.qs().sort as Sort) {
      case 'nameDesc':
        gamesQuery.orderBy('name', 'desc')
        break
      case 'updatedAtAsc':
        gamesQuery.orderBy('updatedAt', 'asc')
        break
      case 'updatedAtDesc':
        gamesQuery.orderBy('updatedAt', 'desc')
        break
      default:
        gamesQuery.orderBy('name', 'asc')
        break
    }

    const games = await gamesQuery.withCount('comments').preload('kinds').paginate(page, 10)

    return <GamesPage games={games} />
  }

  async show({ request }: HttpContext) {
    const game = await Game.findByOrFail('slug', request.param('slug'))

    await game.load('links')
    await game.load('kinds')

    const winrarLink = await Setting.findByOrFail('code', 'winrarLink' as SettingsCode)
    const utorrentLink = await Setting.findByOrFail('code', 'utorrentLink' as SettingsCode)

    return (
      <ShowGamePage
        game={game}
        winrarLink={winrarLink.stringValue || ''}
        utorrentLink={utorrentLink.stringValue || ''}
      />
    )
  }

  @inject()
  async toggleFavorite({ response, request, auth }: HttpContext, toast: ToastService) {
    const game = await Game.findOrFail(request.param('id'))

    if (!auth.user) {
      toast.error('Vous devez être connecté ')
      return response.redirect().toRoute('login.index')
    }

    await auth.user?.load('favoriteGames')

    if (auth.user.isGameInFavorite(game.id)) {
      await auth.user.related('favoriteGames').detach([game.id])
    } else {
      await auth.user.related('favoriteGames').attach([game.id])
    }

    return response.redirect().toRoute('games.show', { slug: game.slug })
  }
}
