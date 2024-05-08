import { Button } from '#components/button'
import { Form } from '#components/forms/index'
import { AuthLayout } from '#layouts/auth.layout'
import { csrfField, route } from '#start/view'

export const LoginPage = () => {
  return (
    <AuthLayout title="Se connecter">
      <form class="flex column gap-5" action={route('login.store')} method="POST">
        {csrfField()}
        <Form.Group name="username" title="Pseudo ou email" required />
        <Form.Group name="password" title="Mot de passe" type="password" required />

        <Button type="submit" text="Se connecter" />
      </form>
    </AuthLayout>
  )
}
