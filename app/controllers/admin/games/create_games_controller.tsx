import Game from '#models/game'
import Kind from '#models/kind'
import Link from '#models/link'
import { Admin } from '#pages/admin/index'
import { createGameValidator } from '#validators/game'
import { cuid } from '@adonisjs/core/helpers'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import string from '@adonisjs/core/helpers/string'
import Setting from '#models/setting'
import { SettingsCode } from '#types/settings'

export default class CreateGamesController {
  async render() {
    const kinds = await Kind.query().select(['id', 'name'])
    const defaultContentDescription = await Setting.findByOrFail(
      'code',
      'defaultContent' as SettingsCode
    )

    return (
      <Admin.Games.Create
        kinds={kinds}
        defaultContent={defaultContentDescription.stringValue || ''}
      />
    )
  }

  //TODO: Added database transaction
  async handle({ request, auth, response }: HttpContext) {
    const { links, picture, kinds, ...gameValidate } =
      await request.validateUsing(createGameValidator)

    await picture.move(app.makePath('uploads/games'), {
      name: `${cuid()}.${picture.extname}`,
    })

    const game = await Game.create({
      ...gameValidate,
      picture: picture.fileName,
      userId: auth.user?.id,
      slug: string.slug(gameValidate.name),
    })

    if (links?.length) {
      await Link.createMany(links.map((link) => ({ ...link, gameId: game.id })))
    }

    if (kinds?.length) {
      for (let index = 0; index < kinds?.length; index++) {
        const element = kinds[index]

        const kind = element.id
          ? await Kind.findOrFail(element.id)
          : await Kind.create({ name: element.name })

        await game.related('kinds').save(kind)
      }
    }

    return response.redirect().toRoute('admin.games')
  }
}
