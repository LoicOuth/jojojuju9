import { ButtonIcon } from '#components/button'
import { Table } from '#components/table/index'
import { AdminLayout } from '#layouts/admin.layout'
import User from '#models/user'
import { RoleName } from '#types/roles'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

interface AdminUsersPageProps {
  users: ModelPaginatorContract<User>
}

export const AdminUsersPage = (props: AdminUsersPageProps) => {
  const { users } = props

  const headers = ['Pseudo', 'Roles', 'Inscrit le', 'Actions']

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
                  <Table.RowItem>{user.createdAt.toLocaleString()}</Table.RowItem>
                  <Table.RowItem width={68}>
                    <div class="flex align-center">
                      {/* TODO: Change role of user */}
                      <ButtonIcon icon="fa-solid fa-shield" />
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
