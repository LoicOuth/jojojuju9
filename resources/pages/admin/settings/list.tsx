import { ButtonIcon } from '#components/button'
import { Table } from '#components/table/index'
import { AdminLayout } from '#layouts/admin.layout'
import Setting from '#models/setting'
import { route } from '#start/view'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

interface ListSetttingsProps {
  settings: ModelPaginatorContract<Setting>
}

export const ListSettingsPage = (props: ListSetttingsProps) => {
  const { settings } = props

  const headers = ['Nom', 'Valeur', 'Mis à jour le', 'Actions']

  return (
    <AdminLayout title="Paramétrages">
      <div class="flex column">
        <Table.Index
          headers={headers}
          nbPage={settings.lastPage}
          searchPlaceholder="Rechercher un paramètre"
          class="mt-5"
        >
          <>
            {settings.map((setting) => (
              <Table.Row>
                <>
                  <Table.RowItem>{setting.name}</Table.RowItem>
                  <Table.RowItem>
                    {setting.stringValue || setting.decimalValue?.toString() || ''}
                  </Table.RowItem>

                  <Table.RowItem>{setting.updatedAt.toLocaleString()}</Table.RowItem>
                  <Table.RowItem width={68}>
                    <div class="flex align-center">
                      <ButtonIcon
                        href={route('admin.settings.edit', { code: setting.code })}
                        icon="fa-solid fa-pen"
                        data-tooltip="Modifier"
                        up-layer="new"
                        up-mode="modal"
                        up-target="[up-modal-scope]"
                      />
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
