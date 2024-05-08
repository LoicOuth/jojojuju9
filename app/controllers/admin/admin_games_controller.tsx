import Game from '#models/game'
import { Admin } from '#pages/admin/index'
import { HttpContext } from '@adonisjs/core/http'

export default class AdminGamesController {
  async render({ request }: HttpContext) {
    const page = request.qs().page || 1

    const gamesQuery = Game.query()

    if (request.qs().s) {
      gamesQuery.where('name', 'like', `%${request.qs().s}%`)
    }

    const games = await gamesQuery.withCount('links').paginate(page, 10)

    return <Admin.Games.Index games={games} />
  }
}
