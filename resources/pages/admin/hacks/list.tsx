import { Button, ButtonIcon } from '#components/button'
import { Table } from '#components/table/index'
import { AdminLayout } from '#layouts/admin.layout'
import Hack from '#models/hack'
import { csrfField, route } from '#start/view'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

interface AdminHacksListProps {
  hacks: ModelPaginatorContract<Hack>
}

export const ListHacksPage = (props: AdminHacksListProps) => {
  const { hacks } = props

  const headers = ['Jeux', 'Type', 'Créé le', 'Modifié le', 'Actions']

  return (
    <AdminLayout title="Hacks">
      <div class="flex column">
        <div class="flex items-center gap-3">
          <Button
            text="Ajouter un hack"
            href={route('admin.hack.create')}
            icon="fa-solid fa-plus"
            up-layer="new"
            up-mode="modal"
            up-target="[up-modal-scope]"
          />
        </div>
        <Table.Index
          headers={headers}
          nbPage={hacks.lastPage}
          searchPlaceholder="Rechercher un hack"
          class="mt-5"
        >
          <>
            {hacks.map((hack) => (
              <Table.Row>
                <>
                  <Table.RowItem>{hack.game}</Table.RowItem>
                  <Table.RowItem>{hack.type}</Table.RowItem>
                  <Table.RowItem>{hack.createdAt.toFormat('dd/LL/yyyy HH:mm')}</Table.RowItem>
                  <Table.RowItem>{hack.updatedAt.toFormat('dd/LL/yyyy HH:mm')}</Table.RowItem>
                  <Table.RowItem width={68}>
                    <div class="flex items-center">
                      <ButtonIcon
                        icon="fa-solid fa-pen"
                        href={route('admin.hack.edit', { id: hack.id })}
                        data-tooltip="Modifier"
                        up-layer="new"
                        up-mode="modal"
                        up-target="[up-modal-scope]"
                      />
                      <form
                        action={`${route('admin.hack.delete', { id: hack.id })}?_method=DELETE`}
                        method="post"
                        up-confirm="Voulez-vous vraiment supprimer le hack ?"
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
