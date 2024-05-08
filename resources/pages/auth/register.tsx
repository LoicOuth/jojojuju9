import { Button } from '#components/button'
import { Form } from '#components/forms/index'
import { AuthLayout } from '#layouts/auth.layout'
import { csrfField, route } from '#start/view'

export const RegisterPage = () => {
  return (
    <AuthLayout title="S'enregistrer">
      <form action={route('register.store')} class="flex column gap-5" method="POST">
        {csrfField()}
        <Form.Group>
          <>
            <Form.Label title="Pseudo" for="username" />
            <Form.Input name="username" />
          </>
        </Form.Group>
        <Form.Group>
          <>
            <Form.Label title="Email" for="email" />
            <Form.Input name="email" type="email" />
          </>
        </Form.Group>
        <Form.Group>
          <>
            <Form.Label title="Mot de passe" for="password" />
            <Form.Input name="password" type="password" />
          </>
        </Form.Group>
        <Form.Group>
          <>
            <Form.Label title="Confirmer le mot de passe" for="password_confirmation" />
            <Form.Input name="password_confirmation" type="password" />
          </>
        </Form.Group>

        <Button type="submit" text="S'enregistrer" />
      </form>
    </AuthLayout>
  )
}
