import Game from '#models/game'
import Kind from '#models/kind'
import Link from '#models/link'
import { Admin } from '#pages/admin/index'
import { createGameValidator } from '#validators/game'
import { cuid } from '@adonisjs/core/helpers'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import string from '@adonisjs/core/helpers/string'

export default class CreateGamesController {
  async render() {
    const kinds = await Kind.all()

    return <Admin.Games.Create kinds={kinds} />
  }

  async handle({ request, auth, response }: HttpContext) {
    const { links, picture, ...gameValidate } = await request.validateUsing(createGameValidator)

    await picture.move(app.makePath('uploads/games'), {
      name: `${cuid()}.${picture.extname}`,
    })

    const game = await Game.create({
      ...gameValidate,
      picture: picture.fileName,
      userId: auth.user?.id,
      slug: string.slug(gameValidate.name),
    })

    if (links) {
      await Link.createMany(links.map((link) => ({ ...link, gameId: game.id })))
    }

    return response.redirect().toRoute('admin.games')
  }
}
