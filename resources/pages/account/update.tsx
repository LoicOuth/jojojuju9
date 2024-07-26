import { Button } from '#components/button'
import { Card } from '#components/card'
import { Form } from '#components/forms/index'
import { AppLayout } from '#layouts/app.layout'
import User from '#models/user'
import { csrfField, route } from '#start/view'

interface UpdateAccountProps {
  user: User
}

export const UpdateAccount = (props: UpdateAccountProps) => {
  const { user } = props
  return (
    <AppLayout title="Modifier mon compte">
      <div class="max-width-wrapper mt-5">
        <Card>
          <form
            action={route('account.update', { id: user.id })}
            class="flex column p-5 gap-5"
            method="POST"
            enctype="multipart/form-data"
          >
            {csrfField()}
            <Form.ImageUploader
              name="avatar"
              text="Ajouter avatar"
              src={user.avatar || ''}
              rounded
            />
            <Form.Group title="Pseudo" name="username" defaultValue={user.username} required />
            <Form.Group
              title="Email"
              name="email"
              type="email"
              defaultValue={user.email}
              required
            />

            <Button type="submit" text="Modifier" />
          </form>
        </Card>
      </div>
    </AppLayout>
  )
}
