import { Button } from '#components/button'
import { Card } from '#components/card'
import { Form } from '#components/forms/index'
import { AppLayout } from '#layouts/app.layout'
import { csrfField, route } from '#start/view'
import { ArrayContactProblem, ContactProblemText } from '#types/contact'
import { HttpContext } from '@adonisjs/core/http'

export const ContactPage = async () => {
  const { auth } = HttpContext.getOrFail()
  await auth.check()

  return (
    <AppLayout title="Contact">
      <div class="max-width-wrapper">
        <Card class="mt-10">
          <form action={route('contact.send')} method="POST" class="flex column gap-5">
            {csrfField()}
            <div class="flex wrap gap-5">
              <Form.Group
                title="Adresse email"
                type="email"
                name="email"
                defaultValue={auth.user?.email || ''}
                required
                class="flex-1"
              />
              <Form.Group
                title="Pseudo"
                name="pseudo"
                defaultValue={auth.user?.username || ''}
                required
                class="flex-1"
              />
            </div>
            <div class="form_group" up-form-group>
              <Form.Label title="Problème" for="problem" required />
              <Form.Select
                options={ArrayContactProblem.map((el) => ({
                  text: ContactProblemText[el],
                  value: el,
                }))}
                defaultValue="install"
                name="problem"
                required
              />
            </div>

            <Form.Group title="Message" name="content" type="textarea" required />

            <Button type="submit" text="Envoyé" />
          </form>
        </Card>
      </div>
    </AppLayout>
  )
}
