import Game from '#models/game'
import Kind from '#models/kind'
import Link from '#models/link'
import { Admin } from '#pages/admin/index'
import { createGameValidator } from '#validators/game'
import { cuid } from '@adonisjs/core/helpers'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import stringHelpers from '@adonisjs/core/helpers/string'
import Setting from '#models/setting'
import { SettingsCode } from '#types/settings'
import { inject } from '@adonisjs/core'
import { ToastService } from '#services/toast.service'
import { assertExists } from '@adonisjs/core/helpers/assert'

export default class CreateGamesController {
  async render() {
    const kinds = await Kind.query().select(['id', 'name'])
    const defaultContentDescription = await Setting.findByOrFail(
      'code',
      'defaultContent' as SettingsCode
    )
    const operatorController = await Setting.findByOrFail(
      'code',
      'operateController' as SettingsCode
    )

    return (
      <Admin.Games.CreateUpdate
        kinds={kinds}
        defaultContent={defaultContentDescription.stringValue || ''}
        operatorController={operatorController.stringValue || ''}
      />
    )
  }

  //TODO: Added database transaction
  @inject()
  async handle({ request, auth, response }: HttpContext, toast: ToastService) {
    const { links, picture, kinds, ...gameValidate } =
      await request.validateUsing(createGameValidator)
    assertExists(auth.user, 'User is not authenticated')

    await picture.move(app.makePath('public/uploads/games'), {
      name: `${cuid()}.${picture.extname}`,
    })

    const game = await Game.create({
      ...gameValidate,
      picture: `/uploads/games/${picture.fileName}`,
      userId: auth.user.id,
      slug: stringHelpers.slug(gameValidate.name),
      isValidated: auth.user.isAdmin(),
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

    toast.success(`Le jeu ${game.name} a été créé`)

    return response.redirect().toRoute('admin.games')
  }
}
