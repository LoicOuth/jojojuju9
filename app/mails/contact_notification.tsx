import { BaseMail } from '@adonisjs/mail'
import { ContactEmailTemplate } from '../../resources/emails/contact_email_template.js'
import { ContactProblem } from '#types/contact'
import env from '#start/env'

interface ContactNotificationParams {
  from: string
  pseudo: string
  content: string
  problem: ContactProblem
}

export default class ContactNotification extends BaseMail {
  subject = 'Mail depuis page de contact'

  constructor(private params: ContactNotificationParams) {
    super()
  }

  /**
   * The "prepare" method is called automatically when
   * the email is sent or queued.
   */
  async prepare() {
    const html = await ContactEmailTemplate({
      content: this.params.content,
      email: this.params.from,
      problem: this.params.problem,
      pseudo: this.params.pseudo,
    })

    this.message
      .to(env.get('SMTP_USERNAME'), 'Contact depuis site')
      .from(this.params.from, this.params.pseudo)
      .replyTo(this.params.from, this.params.pseudo)
      .html(html)
  }
}
