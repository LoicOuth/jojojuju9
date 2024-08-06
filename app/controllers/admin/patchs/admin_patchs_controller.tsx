import Patch from '#models/patch'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

export default class AdminPatchsController {
  async render({ request }: HttpContext) {
    const page = request.qs().page || 1

    const patchsQuery = Patch.query()

    if (request.qs().s) {
      patchsQuery.where('program', 'like', `%${request.qs().s}%`)
    }

    const patchs =
      request.qs().size === 'all'
        ? await patchsQuery
        : await patchsQuery.paginate(page, request.qs().size || 50)

    return <Admin.Patchs.Index patchs={patchs} />
  }

  @inject()
  async delete({ request, response }: HttpContext, toast: ToastService) {
    const patch = await Patch.findOrFail(request.params().id)

    await patch.delete()

    toast.success(`Le patch ${patch.program} a été supprimé`)

    return response.redirect().back()
  }
}
