import Game from '#models/game'
import Kind from '#models/kind'
import Link from '#models/link'
import Setting from '#models/setting'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { SettingsCode } from '#types/settings'
import { updateGameValidator } from '#validators/game'
import { inject } from '@adonisjs/core'
import { cuid } from '@adonisjs/core/helpers'
import stringHelpers from '@adonisjs/core/helpers/string'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { unlinkSync } from 'fs'

export default class UpdateGamesController {
  async render({ request }: HttpContext) {
    const game = await Game.findByOrFail('slug', request.param('slug'))
    await game.load((loader) => {
      loader.load('kinds').load('links')
    })

    const kinds = await Kind.query().select(['id', 'name'])

    const operatorController = await Setting.findByOrFail(
      'code',
      'operateController' as SettingsCode
    )

    return (
      <Admin.Games.CreateUpdate
        kinds={kinds}
        game={game}
        operatorController={operatorController.stringValue || ''}
      />
    )
  }

  //TODO: Need refactor
  @inject()
  async handle({ request, response }: HttpContext, toast: ToastService) {
    const game = await Game.findOrFail(request.param('id'))
    const { links, picture, kinds, ...gameValidate } = await request.validateUsing(
      updateGameValidator,
      { meta: { id: game.id } }
    )

    if (picture) {
      unlinkSync(app.makePath(`public/${game.picture}`))
      await picture.move(app.makePath('public/uploads/games'), {
        name: `${cuid()}.${picture.extname}`,
      })
    }

    await game
      .merge({
        ...gameValidate,
        picture: picture ? `/uploads/games/${picture.fileName}` : game.picture,
        slug: stringHelpers.slug(gameValidate.name),
      })
      .save()

    if (links?.length) {
      const linksId: number[] = []
      for (let index = 0; index < links.length; index++) {
        const link = links[index]

        if (link.id) {
          const linkModel = await Link.findOrFail(link.id)
          await linkModel.merge({ ...link }).save()
          linksId.push(linkModel.id)
        } else {
          const linkModel = await Link.create({ ...link, gameId: game.id })
          linksId.push(linkModel.id)
        }
      }

      await game.related('links').query().whereNotIn('id', linksId).delete()
    }

    if (kinds?.length) {
      const kindsId: number[] = []
      for (let index = 0; index < kinds?.length; index++) {
        const element = kinds[index]

        const kind = element.id
          ? await Kind.findOrFail(element.id)
          : await Kind.create({ name: element.name })

        kindsId.push(kind.id)
      }

      await game.related('kinds').sync(kindsId)
    }

    toast.success(`Le jeu ${game.name} a été modifié`)

    return response.redirect().toRoute('admin.games')
  }
}
