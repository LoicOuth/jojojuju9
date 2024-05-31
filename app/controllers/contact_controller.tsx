import { ContactPage } from '#pages/contact'
import { ArrayContactProblem } from '#types/contact'
import { HttpContext } from '@adonisjs/core/http'
import vine from '@vinejs/vine'
import mail from '@adonisjs/mail/services/main'
import ContactNotification from '#mails/contact_notification'
import { inject } from '@adonisjs/core'
import { ToastService } from '#services/toast.service'

export default class ContactController {
  static validator = vine.compile(
    vine.object({
      pseudo: vine.string(),
      email: vine.string().email(),
      problem: vine.enum(ArrayContactProblem),
      content: vine.string(),
    })
  )

  render() {
    return <ContactPage />
  }

  @inject()
  async handle({ request, response }: HttpContext, toast: ToastService) {
    const validate = await request.validateUsing(ContactController.validator)

    await mail.send(new ContactNotification({ ...validate, from: validate.email }))

    toast.success('Message envoyé')

    return response.redirect().toRoute('contact')
  }
}
