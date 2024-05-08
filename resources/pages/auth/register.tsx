import { Button } from '#components/button'
import { Form } from '#components/forms/index'
import { AuthLayout } from '#layouts/auth.layout'
import { csrfField, route } from '#start/view'

export const RegisterPage = () => {
  return (
    <AuthLayout title="S'enregistrer">
      <form action={route('register.store')} class="flex column gap-5" method="POST">
        {csrfField()}
        <Form.Group title="Pseudo" name="username" required />
        <Form.Group title="Email" name="email" type="email" required />
        <Form.Group title="Mot de passe" name="password" type="password" required />
        <Form.Group
          title="Confirmer le mot de passe"
          name="password_confirmation"
          type="password"
          required
        />

        <Button type="submit" text="S'enregistrer" />
      </form>
    </AuthLayout>
  )
}
