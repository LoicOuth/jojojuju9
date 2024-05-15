import Kind from '#models/kind'
import Link from '#models/link'
import Software from '#models/software'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { updateSoftwareValidator } from '#validators/software'
import { inject } from '@adonisjs/core'
import { cuid } from '@adonisjs/core/helpers'
import stringHelpers from '@adonisjs/core/helpers/string'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { unlinkSync } from 'fs'

export default class UpdateSoftwaresController {
  async render({ request }: HttpContext) {
    const software = await Software.findByOrFail('slug', request.param('slug'))
    await software.load((loader) => {
      loader.load('kinds').load('links')
    })
    const kinds = await Kind.query().select(['id', 'name'])

    return <Admin.Softwares.CreateUpdate kinds={kinds} software={software} />
  }

  //TODO: Need refactor
  @inject()
  async handle({ request, response }: HttpContext, toast: ToastService) {
    const software = await Software.findOrFail(request.param('id'))
    const { links, picture, kinds, ...softwareValidate } = await request.validateUsing(
      updateSoftwareValidator,
      { meta: { id: software.id } }
    )

    if (picture) {
      unlinkSync(app.makePath(`public/${software.picture}`))
      await picture.move(app.makePath('public/uploads/softwares'), {
        name: `${cuid()}.${picture.extname}`,
      })
    }

    await software
      .merge({
        ...softwareValidate,
        picture: picture ? `/uploads/games/${picture.fileName}` : software.picture,
        slug: stringHelpers.slug(softwareValidate.name),
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
          const linkModel = await Link.create({ ...link, softwareId: software.id })
          linksId.push(linkModel.id)
        }
      }

      await software.related('links').query().whereNotIn('id', linksId).delete()
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

      await software.related('kinds').sync(kindsId)
    }

    toast.success(`Le logiciel ${software.name} a été modifié`)

    return response.redirect().toRoute('admin.softwares')
  }
}
