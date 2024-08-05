import Software from '#models/software'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import app from '@adonisjs/core/services/app'
import { unlinkSync } from 'fs'

export default class AdminSoftwaresController {
  async render({ request }: HttpContext) {
    const page = request.qs().page || 1

    const softwaresQuery = Software.query()

    if (request.qs().s) {
      softwaresQuery.where('name', 'like', `%${request.qs().s}%`)
    }

    const softwares = await softwaresQuery
      .withCount('links')
      .paginate(page, request.qs().size || 50)

    return <Admin.Softwares.Index softwares={softwares} />
  }

  @inject()
  async delete({ request, response }: HttpContext, toast: ToastService) {
    const software = await Software.findOrFail(request.params().id)

    unlinkSync(app.makePath(`public/${software.picture}`))
    await software.delete()

    toast.success(`Le logiciel ${software.name} a été supprimé`)

    return response.redirect().back()
  }
}
