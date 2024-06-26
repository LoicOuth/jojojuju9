import Comment from '#models/comment'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

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

  async create({ request, auth, response }: HttpContext) {
    const { content, gameId, softwareId } = await request.validateUsing(
      CommentsController.createValidator
    )

    if (!auth.user) {
      return response.unauthorized("Vous n'êtes pas connectez")
    }

    await Comment.create({
      content,
      gameId,
      softwareId,
      userId: auth.user.id,
    })

    return response.noContent()
  }

  async update({ request, auth, response }: HttpContext) {
    const { content } = await request.validateUsing(CommentsController.updateValidator)
    const comment = await Comment.findOrFail(request.param('id'))

    if (!auth.user) {
      return response.unauthorized("Vous n'êtes pas connectez")
    }

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
    const comment = await Comment.findOrFail(request.param('id'))

    if (auth.user?.id !== comment.userId) {
      return response.forbidden("Vous n'avez pas les droits")
    }

    await comment.delete()

    return response.noContent()
  }
}
