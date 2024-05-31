import Question from '#models/question'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'

export default class CreateQuestionController {
  static validator = vine.compile(
    vine.object({
      question: vine.string(),
      content: vine.string(),
    })
  )

  render() {
    return <Admin.Faq.CreateUpdate />
  }

  @inject()
  async handle({ request, response }: HttpContext, toast: ToastService) {
    const { content, question } = await request.validateUsing(CreateQuestionController.validator)

    await Question.create({ content, question })

    toast.success(`La question ${question} a été créée`)

    return response.redirect().toRoute('admin.faq')
  }
}
