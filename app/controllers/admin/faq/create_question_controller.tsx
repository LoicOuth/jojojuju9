import Question from '#models/question'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { inject } from '@adonisjs/core'
import { assertExists } from '@adonisjs/core/helpers/assert'
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
  async handle({ request, response, auth }: HttpContext, toast: ToastService) {
    const { content, question } = await request.validateUsing(CreateQuestionController.validator)
    assertExists(auth.user, 'User is not authenticated')

    await Question.create({
      content,
      question,
      createdById: auth.user.id,
      isValidated: auth.user.isAdmin(),
    })

    toast.success(`La question ${question} a été créée`)

    return response.redirect().toRoute('admin.faq')
  }
}
