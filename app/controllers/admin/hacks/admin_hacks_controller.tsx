import Hack from '#models/hack'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

export default class AdminHacksController {
  async render({ request }: HttpContext) {
    const page = request.qs().page || 1

    const hacksQuery = Hack.query()

    if (request.qs().s) {
      hacksQuery.where('game', 'like', `%${request.qs().s}%`)
    }

    const hacks =
      request.qs().size === 'all'
        ? await hacksQuery
        : await hacksQuery.paginate(page, request.qs().size || 50)

    return <Admin.Hacks.Index hacks={hacks} />
  }

  @inject()
  async delete({ request, response }: HttpContext, toast: ToastService) {
    const hack = await Hack.findOrFail(request.params().id)

    await hack.delete()

    toast.success(`Le hack ${hack.game} a été supprimée`)

    return response.redirect().back()
  }
}
