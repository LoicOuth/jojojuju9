import Game from '#models/game'
import Kind from '#models/kind'
import { GamesPage } from '#pages/games'
import { ShowGamePage } from '#pages/show_game'
import { SettingsService } from '#services/settings.service'
import { ToastService } from '#services/toast.service'
import { Sort } from '#types/sort'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

export default class GamesController {
  async render({ request, auth }: HttpContext) {
    await auth.check()
    const page = request.qs().page || 1

    const gamesQuery = Game.query().where('isValidated', true).preload('kinds')

    if (request.qs().s) {
      gamesQuery.where('name', 'like', `%${request.qs().s}%`)
    }

    if (request.qs().favorite === 'on' && auth.user) {
      await auth.user.load('favoriteGames')
      gamesQuery.whereIn(
        'id',
        auth.user.favoriteGames.map((game) => game.id)
      )
    }

    if (request.qs().tag && parseInt(request.qs().tag)) {
      gamesQuery.whereHas('kinds', (kindQuery) => {
        kindQuery.where('id', request.qs().tag)
      })
    }

    if (request.qs().multiplayer === 'on') {
      gamesQuery.where('multiplayer', true)
    }

    if (request.qs().allDlc === 'on') {
      gamesQuery.where('withDlc', true)
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

    const games = await gamesQuery.withCount('comments').paginate(page, request.qs().size || 50)
    const kinds = await Kind.query().has('games').orderBy('name')

    return <GamesPage games={games} kinds={kinds} />
  }

  @inject()
  async show({ request }: HttpContext, settings: SettingsService) {
    const game = await Game.findByOrFail('slug', request.param('slug'))
    const links = await settings.getSoftwareLinks()

    await game.load('links')
    await game.load('kinds')

    return <ShowGamePage game={game} {...links} />
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
