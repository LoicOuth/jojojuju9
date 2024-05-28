import Software from '#models/software'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class UpdateVersionSoftwaresController {
  static validator = vine.compile(
    vine.object({
      softwares: vine.array(vine.object({ id: vine.number(), version: vine.string() })),
    })
  )
  async render() {
    const softwares = await Software.query().select(['id', 'name', 'version']).orderBy('name')

    return <Admin.Softwares.UpdateVersion softwares={softwares} />
  }

  @inject()
  async handle({ request, response }: HttpContext, toast: ToastService) {
    const { softwares } = await request.validateUsing(UpdateVersionSoftwaresController.validator)

    for (let index = 0; index < softwares.length; index++) {
      const element = softwares[index]
      const software = await Software.findOrFail(element.id)

      await software.merge({ version: element.version }).save()
    }

    toast.success(`Les versions ont été modifiés`)

    return response.redirect().toRoute('admin.softwares')
  }
}
