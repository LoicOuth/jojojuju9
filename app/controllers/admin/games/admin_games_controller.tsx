import Game from '#models/game'
import { Admin } from '#pages/admin/index'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { unlinkSync } from 'fs'

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

  async delete({ request, response }: HttpContext) {
    const game = await Game.findOrFail(request.params().id)

    unlinkSync(app.makePath(`public/${game.picture}`))
    await game.delete()

    return response.redirect().toRoute('admin.games')
  }
}
