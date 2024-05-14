import Response from '#models/response'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class ResponsesController {
  static createValidator = vine.compile(
    vine.object({
      commentId: vine.number(),
      content: vine.string(),
    })
  )

  static updateValidator = vine.compile(
    vine.object({
      content: vine.string(),
    })
  )

  async create({ request, auth, response }: HttpContext) {
    const { content, commentId } = await request.validateUsing(ResponsesController.createValidator)

    if (!auth.user) {
      return response.unauthorized("Vous n'êtes pas connectez")
    }

    await Response.create({
      content,
      commentId,
      userId: auth.user.id,
    })

    return response.noContent()
  }

  async update({ request, auth, response }: HttpContext) {
    const { content } = await request.validateUsing(ResponsesController.updateValidator)
    const responseModel = await Response.findOrFail(request.param('id'))

    if (!auth.user) {
      return response.unauthorized("Vous n'êtes pas connectez")
    }

    if (auth.user.id !== responseModel.userId) {
      return response.forbidden("Vous n'avez pas les droits")
    }

    await responseModel
      .merge({
        content,
      })
      .save()

    return response.noContent()
  }

  async delete({ request, response, auth }: HttpContext) {
    const responseModel = await Response.findOrFail(request.param('id'))

    if (auth.user?.id !== responseModel.userId) {
      return response.forbidden("Vous n'avez pas les droits")
    }

    await responseModel.delete()

    return response.noContent()
  }
}
