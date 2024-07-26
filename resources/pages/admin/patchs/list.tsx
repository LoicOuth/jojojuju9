import { Button, ButtonIcon } from '#components/button'
import { Table } from '#components/table/index'
import { AdminLayout } from '#layouts/admin.layout'
import Patch from '#models/patch'
import { csrfField, route } from '#start/view'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

interface AdminPatchsListProps {
  patchs: ModelPaginatorContract<Patch>
}

export const ListPatchsPage = (props: AdminPatchsListProps) => {
  const { patchs } = props

  const headers = ['Programme', 'Type', 'Créé le', 'Modifié le', 'Actions']

  return (
    <AdminLayout title="Patchs/Fixs/Astuces">
      <div class="flex column">
        <div class="flex items-center gap-3">
          <Button
            text="Ajouter un patch/Fix/Astuce"
            href={route('admin.patchs.create')}
            icon="fa-solid fa-plus"
            up-layer="new"
            up-accept-location={route('admin.patchs')}
            up-on-accepted="up.render('body', { response: event.response })"
          />
        </div>
        <Table.Index
          headers={headers}
          nbPage={patchs.lastPage}
          searchPlaceholder="Rechercher un patch/Fix/Astuce"
          class="mt-5"
        >
          <>
            {patchs.map((patch) => (
              <Table.Row>
                <>
                  <Table.RowItem>{patch.program}</Table.RowItem>
                  <Table.RowItem>{patch.type}</Table.RowItem>
                  <Table.RowItem>{patch.createdAt.toFormat('dd/LL/yyyy HH:mm')}</Table.RowItem>
                  <Table.RowItem>{patch.updatedAt.toFormat('dd/LL/yyyy HH:mm')}</Table.RowItem>
                  <Table.RowItem width={68}>
                    <div class="flex items-center">
                      <ButtonIcon
                        icon="fa-solid fa-pen"
                        href={route('admin.patchs.edit', { id: patch.id })}
                        data-tooltip="Modifier"
                        up-layer="new"
                        up-accept-location={route('admin.patchs')}
                        up-on-accepted="up.render('body', { response: event.response })"
                      />
                      <form
                        action={`${route('admin.patchs.delete', { id: patch.id })}?_method=DELETE`}
                        method="post"
                        up-confirm="Voulez-vous vraiment supprimer le patch ?"
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
