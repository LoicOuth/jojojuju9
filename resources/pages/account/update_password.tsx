import { Button } from '#components/button'
import { Card } from '#components/card'
import { Form } from '#components/forms/index'
import { AppLayout } from '#layouts/app.layout'
import User from '#models/user'
import { csrfField, route } from '#start/view'

interface UpdateAccountPasswordProps {
  user: User
}

export const UpdateAccountPassword = (props: UpdateAccountPasswordProps) => {
  const { user } = props
  return (
    <AppLayout title="Modifier mon mot de passe">
      <div class="max-width-wrapper mt-5">
        <Card>
          <form
            action={route('account.update.password', { id: user.id })}
            class="flex column p-5 gap-5"
            up-modal-scope
            up-layer="parent"
            up-target="body"
            method="POST"
            enctype="multipart/form-data"
          >
            {csrfField()}
            <Form.Group title="Mot de passe" name="password" type="password" required />
            <Form.Group
              title="Confirmer le mot de passe"
              name="password_confirmation"
              type="password"
              required
            />

            <Button type="submit" text="Modifier" />
          </form>
        </Card>
      </div>
    </AppLayout>
  )
}
