import Question from '#models/question'
import { Admin } from '#pages/admin/index'
import { ToastService } from '#services/toast.service'
import { inject } from '@adonisjs/core'
import { HttpContext } from '@adonisjs/core/http'

export default class AdminFAQController {
  async render({ request }: HttpContext) {
    const page = request.qs().page || 1

    const questionsQuery = Question.query()

    if (request.qs().s) {
      questionsQuery.where('question', 'like', `%${request.qs().s}%`)
    }

    const questions = await questionsQuery.paginate(page, request.qs().size || 50)

    return <Admin.Faq.Index questions={questions} />
  }

  @inject()
  async delete({ request, response }: HttpContext, toast: ToastService) {
    const question = await Question.findOrFail(request.params().id)

    await question.delete()

    toast.success(`La question ${question.question} a été supprimée`)

    return response.redirect().toRoute('admin.faq')
  }
}
