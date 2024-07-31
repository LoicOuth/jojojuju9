import Comment from '#models/comment'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import { assertExists } from '@adonisjs/core/helpers/assert'
import { inject } from '@adonisjs/core'
import { DiscordAlertService } from '#services/discord_alert.service'

export default class CommentsController {
  static createValidator = vine.compile(
    vine.object({
      gameId: vine.number().optional(),
      softwareId: vine.number().optional(),
      content: vine.string(),
    })
  )

  static updateValidator = vine.compile(
    vine.object({
      content: vine.string(),
    })
  )

  async gameComments({ request, response }: HttpContext) {
    const comments = await Comment.query()
      .where('gameId', request.param('id'))
      .preload('user')
      .preload('responses', (responsesQuery) => {
        responsesQuery.orderBy('createdAt', 'desc').preload('user')
      })
      .orderBy('createdAt', 'desc')

    return response.json(comments)
  }

  async softwareComments({ request, response }: HttpContext) {
    const comments = await Comment.query()
      .where('softwareId', request.param('id'))
      .preload('user')
      .preload('responses', (responsesQuery) => {
        responsesQuery.orderBy('createdAt', 'desc').preload('user')
      })
      .orderBy('createdAt', 'desc')

    return response.json(comments)
  }

  @inject()
  async create({ request, auth, response }: HttpContext, discordAlertService: DiscordAlertService) {
    assertExists(auth.user, 'User is not authenticated')
    const { content, gameId, softwareId } = await request.validateUsing(
      CommentsController.createValidator
    )

    const comment = await Comment.create({
      content,
      gameId,
      softwareId,
      userId: auth.user.id,
    })

    await discordAlertService.alertOnNewComment(comment)

    return response.noContent()
  }

  async update({ request, auth, response }: HttpContext) {
    assertExists(auth.user, 'User is not authenticated')
    const { content } = await request.validateUsing(CommentsController.updateValidator)
    const comment = await Comment.findOrFail(request.param('id'))

    if (auth.user.id !== comment.userId) {
      return response.forbidden("Vous n'avez pas les droits")
    }

    await comment
      .merge({
        content,
      })
      .save()

    return response.noContent()
  }

  async delete({ request, response, auth }: HttpContext) {
    assertExists(auth.user, 'User is not authenticated')
    const comment = await Comment.findOrFail(request.param('id'))

    if (auth.user.id !== comment.userId) {
      return response.forbidden("Vous n'avez pas les droits")
    }

    await comment.delete()

    return response.noContent()
  }
}
