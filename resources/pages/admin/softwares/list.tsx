import { Button, ButtonIcon } from '#components/button'
import { Table } from '#components/table/index'
import { AdminLayout } from '#layouts/admin.layout'
import Software from '#models/software'
import { csrfField, route } from '#start/view'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

interface AdminSoftwaresPageProps {
  softwares: ModelPaginatorContract<Software>
}

export const ListSoftwaresPage = (props: AdminSoftwaresPageProps) => {
  const { softwares } = props

  const headers = ['Nom du logiciel', 'Version', 'Créé le', 'Modifié le', 'Actions']

  return (
    <AdminLayout title="Logiciels">
      <div class="flex column">
        <div class="flex items-center gap-3">
          <Button
            text="Ajouter un logiciel"
            href={route('admin.softwares.create')}
            icon="fa-solid fa-plus"
          />
          <Button
            text="Mettre à jour les versions"
            href={route('admin.softwares.version.edit')}
            icon="fa-solid fa-pen"
          />
        </div>
        <Table.Index
          headers={headers}
          nbPage={softwares.lastPage}
          searchPlaceholder="Rechercher un logiciel"
          class="mt-5"
        >
          <>
            {softwares.map((software) => (
              <Table.Row>
                <>
                  <Table.RowItem>{software.name}</Table.RowItem>
                  <Table.RowItem>{software.version || ''}</Table.RowItem>
                  <Table.RowItem>{software.createdAt.toFormat('dd/LL/yyyy HH:mm')}</Table.RowItem>
                  <Table.RowItem>{software.updatedAt.toFormat('dd/LL/yyyy HH:mm')}</Table.RowItem>
                  <Table.RowItem width={68}>
                    <div class="flex items-center ">
                      <ButtonIcon
                        icon="fa-solid fa-pen"
                        href={route('admin.softwares.edit', { slug: software.slug })}
                        data-tooltip="Modifier"
                      />
                      <form
                        action={`${route('admin.softwares.delete', { id: software.id })}?_method=DELETE`}
                        method="post"
                        up-confirm="Voulez-vous vraiment supprimer le logiciel ?"
                      >
                        {csrfField()}
                        <ButtonIcon
                          type="submit"
                          icon="fa-solid fa-trash"
                          color="error"
                          data-tooltip="Supprimer"
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
