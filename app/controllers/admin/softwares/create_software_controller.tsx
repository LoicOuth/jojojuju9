import Kind from '#models/kind'
import Link from '#models/link'
import Setting from '#models/setting'
import Software from '#models/software'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { SettingsCode } from '#types/settings'
import { createSoftwareValidator } from '#validators/software'
import { inject } from '@adonisjs/core'
import { cuid } from '@adonisjs/core/helpers'
import stringHelpers from '@adonisjs/core/helpers/string'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'

export default class CreateSoftwaresController {
  async render() {
    const kinds = await Kind.query().select(['id', 'name'])
    const defaultContentDescription = await Setting.findByOrFail(
      'code',
      'defaultContent' as SettingsCode
    )

    return (
      <Admin.Softwares.CreateUpdate
        kinds={kinds}
        defaultContent={defaultContentDescription.stringValue || ''}
      />
    )
  }

  //TODO: Added database transaction
  @inject()
  async handle({ request, auth, response }: HttpContext, toast: ToastService) {
    const { links, picture, kinds, ...softwareValidate } =
      await request.validateUsing(createSoftwareValidator)

    await picture.move(app.makePath('public/uploads/softwares'), {
      name: `${cuid()}.${picture.extname}`,
    })

    const software = await Software.create({
      ...softwareValidate,
      picture: `/uploads/softwares/${picture.fileName}`,
      userId: auth.user?.id,
      slug: stringHelpers.slug(softwareValidate.name),
    })

    if (links?.length) {
      await Link.createMany(links.map((link) => ({ ...link, softwareId: software.id })))
    }

    if (kinds?.length) {
      for (let index = 0; index < kinds?.length; index++) {
        const element = kinds[index]

        const kind = element.id
          ? await Kind.findOrFail(element.id)
          : await Kind.create({ name: element.name })

        await software.related('kinds').save(kind)
      }
    }

    toast.success(`Le logiciel ${software.name} a été créé`)

    return response.redirect().toRoute('admin.softwares')
  }
}
