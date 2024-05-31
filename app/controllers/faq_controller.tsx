import Question from '#models/question'
import { FaqPage } from '#pages/faq'

export default class FaqController {
  async render() {
    const questions = await Question.query().orderBy('createdAt', 'desc')

    return <FaqPage questions={questions} />
  }
}
