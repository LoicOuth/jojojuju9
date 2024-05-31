import Question from '#models/question'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class UpdateQuestionController {
  static validator = vine.compile(
    vine.object({
      question: vine.string(),
      content: vine.string(),
    })
  )

  async render({ request }: HttpContext) {
    const question = await Question.findOrFail(request.param('id'))

    return <Admin.Faq.CreateUpdate question={question} />
  }

  @inject()
  async handle({ request, response }: HttpContext, toast: ToastService) {
    const questionModel = await Question.findOrFail(request.param('id'))
    const { content, question } = await request.validateUsing(UpdateQuestionController.validator)

    await questionModel.merge({ content, question }).save()

    toast.success(`La question ${question} a été Modifiée`)

    return response.redirect().toRoute('admin.faq')
  }
}
