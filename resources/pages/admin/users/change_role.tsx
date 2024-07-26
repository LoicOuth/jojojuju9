import { Button } from '#components/button'
import { Form } from '#components/forms/index'
import { AdminLayout } from '#layouts/admin.layout'
import User from '#models/user'
import { csrfField, route } from '#start/view'
import { Role, RoleName } from '#types/roles'

interface ChangeUserRoleProps {
  user: User
}

export const ChangeUserRole = (props: ChangeUserRoleProps) => {
  const { user } = props
  console.log(user.roles)
  return (
    <AdminLayout title={`Changer le rôle de ${user.username}`} returnHref={route('admin.users')}>
      <form
        action={`${route('admin.users.role.update', { id: user.id })}?_method=PUT`}
        class="flex column gap-5 p-5"
        method="POST"
        up-modal-scope
        up-layer="parent"
        up-target="body"
      >
        {csrfField()}
        <div class="flex gap-5">
          {Object.entries(RoleName).map(([role, name]) => (
            <Form.Checkbox
              name={role}
              title={name}
              defaultValue={user.roles?.includes(role as Role)}
            />
          ))}
        </div>

        <Button type="submit" text="Mettre à jour" />
      </form>
    </AdminLayout>
  )
}
