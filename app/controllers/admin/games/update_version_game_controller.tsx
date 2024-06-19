import Game from '#models/game'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class UpdateVersionGamesController {
  static validator = vine.compile(
    vine.object({
      games: vine.array(vine.object({ id: vine.number(), version: vine.string().optional() })),
    })
  )
  async render() {
    const games = await Game.query().select(['id', 'name', 'version']).orderBy('name')

    return <Admin.Games.UpdateVersion games={games} />
  }

  @inject()
  async handle({ request, response }: HttpContext, toast: ToastService) {
    const { games } = await request.validateUsing(UpdateVersionGamesController.validator)

    for (let index = 0; index < games.length; index++) {
      const element = games[index]
      const game = await Game.findOrFail(element.id)

      await game.merge({ version: element.version }).save()
    }

    toast.success(`Les versions ont été modifiés`)

    return response.redirect().toRoute('admin.games')
  }
}
