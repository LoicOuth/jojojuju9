import { Button } from '#components/button'
import { Form } from '#components/forms/index'
import { AuthLayout } from '#layouts/auth.layout'
import { csrfField, route } from '#start/view'

export const LoginPage = () => {
  return (
    <AuthLayout title="Se connecter">
      <form class="flex column gap-5" action={route('login.store')} method="POST">
        {csrfField()}
        <Form.Group>
          <>
            <Form.Label title="Email ou pseudo" for="username" />
            <Form.Input name="username" />
          </>
        </Form.Group>
        <Form.Group>
          <>
            <Form.Label title="Mot de passe" for="password" />
            <Form.Input name="password" type="password" />
          </>
        </Form.Group>

        <Button type="submit" text="Se connecter" />
      </form>
    </AuthLayout>
  )
}
