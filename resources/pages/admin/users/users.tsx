import { ButtonIcon } from '#components/button'
import { Chip } from '#components/chip'
import { Table } from '#components/table/index'
import { AdminLayout } from '#layouts/admin.layout'
import User from '#models/user'
import { csrfField, route } from '#start/view'
import { RoleName } from '#types/roles'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

interface AdminUsersPageProps {
  users: ModelPaginatorContract<User>
}

export const AdminUsersPage = (props: AdminUsersPageProps) => {
  const { users } = props

  const headers = ['Pseudo', 'Roles', 'Actif', 'Inscrit le', 'Actions']

  return (
    <AdminLayout title="Utilisateurs">
      <div class="flex column">
        <Table.Index
          headers={headers}
          nbPage={users.lastPage}
          searchPlaceholder="Rechercher un utilisateur"
          class="mt-5"
        >
          <>
            {users.map((user) => (
              <Table.Row>
                <>
                  <Table.RowItem>{user.username}</Table.RowItem>
                  <Table.RowItem>
                    {user.roles?.map((role) => RoleName[role]).join(',') || 'Aucun'}
                  </Table.RowItem>
                  <Table.RowItem>
                    {user.isActive ? (
                      <Chip color="success" text="Oui" />
                    ) : (
                      <Chip color="error" text="Non" />
                    )}
                  </Table.RowItem>
                  <Table.RowItem>{user.createdAt.toLocaleString()}</Table.RowItem>
                  <Table.RowItem width={68}>
                    <div class="flex align-center">
                      <ButtonIcon
                        href={route('admin.users.role', { username: user.username })}
                        icon="fa-solid fa-shield"
                        data-tooltip="Changer de rôle"
                        up-layer="new"
                        up-mode="modal"
                        up-target="[up-modal-scope]"
                      />
                      <form
                        action={`${route('admin.users.ban', { id: user.id })}?_method=PUT`}
                        method="post"
                        up-confirm="Voulez-vous vraiment bannir cet utilisateur ?"
                      >
                        {csrfField()}
                        <input
                          type="checkbox"
                          name="active"
                          style={{ display: 'none' }}
                          {...(!user.isActive && { checked: true })}
                        />
                        <ButtonIcon
                          type="submit"
                          icon={`fa-solid ${user.isActive ? 'fa-user-slash' : 'fa-user-check'}`}
                          data-tooltip={user.isActive ? 'Bannir' : 'Débannir'}
                          color={user.isActive ? 'error' : 'success'}
                        />
                      </form>
                    </div>
                  </Table.RowItem>
                </>
              </Table.Row>
            ))}
          </>
        </Table.Index>
      </div>
    </AdminLayout>
  )
}
