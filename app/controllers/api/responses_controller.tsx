import Response from '#models/response'
import { DiscordAlertService } from '#services/discord_alert.service'
import { inject } from '@adonisjs/core'
import { assertExists } from '@adonisjs/core/helpers/assert'
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

  @inject()
  async create({ request, auth, response }: HttpContext, discordAlertService: DiscordAlertService) {
    assertExists(auth.user, 'User is not authenticated')
    const { content, commentId } = await request.validateUsing(ResponsesController.createValidator)

    const responseModel = await Response.create({
      content,
      commentId,
      userId: auth.user.id,
    })

    await discordAlertService.alertOnNewResponse(responseModel)

    return response.noContent()
  }

  async update({ request, auth, response }: HttpContext) {
    assertExists(auth.user, 'User is not authenticated')
    const { content } = await request.validateUsing(ResponsesController.updateValidator)
    const responseModel = await Response.findOrFail(request.param('id'))

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
    assertExists(auth.user, 'User is not authenticated')
    const responseModel = await Response.findOrFail(request.param('id'))

    if (auth.user.id !== responseModel.userId) {
      return response.forbidden("Vous n'avez pas les droits")
    }

    await responseModel.delete()

    return response.noContent()
  }
}
