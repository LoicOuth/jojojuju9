import Question from '#models/question'
import { FaqPage } from '#pages/faq'

export default class FaqController {
  async render() {
    const questions = await Question.query().where('isValidated', true).orderBy('createdAt', 'desc')

    return <FaqPage questions={questions} />
  }
}
