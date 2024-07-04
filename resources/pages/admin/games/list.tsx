import { Button, ButtonIcon } from '#components/button'
import { Table } from '#components/table/index'
import { AdminLayout } from '#layouts/admin.layout'
import Game from '#models/game'
import { csrfField, route } from '#start/view'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

interface AdminGamesPageProps {
  games: ModelPaginatorContract<Game>
}

export const ListGamesPage = (props: AdminGamesPageProps) => {
  const { games } = props

  const headers = ['Nom du jeu', 'Version', 'Créé le', 'Modifié le', 'Actions']

  return (
    <AdminLayout title="Jeux">
      <div class="flex column">
        <div class="flex items-center gap-3">
          <Button
            text="Ajouter un jeu"
            href={route('admin.games.create')}
            icon="fa-solid fa-plus"
          />
          <Button
            text="Mettre à jour les versions"
            href={route('admin.games.version.edit')}
            icon="fa-solid fa-pen"
          />
        </div>
        <Table.Index
          headers={headers}
          nbPage={games.lastPage}
          searchPlaceholder="Rechercher un jeu"
          class="mt-5"
        >
          <>
            {games.map((game) => (
              <Table.Row>
                <>
                  <Table.RowItem>{game.name}</Table.RowItem>
                  <Table.RowItem>{game.version || ''}</Table.RowItem>
                  <Table.RowItem>{game.createdAt.toFormat('dd/LL/yyyy HH:mm')}</Table.RowItem>
                  <Table.RowItem>{game.updatedAt.toFormat('dd/LL/yyyy HH:mm')}</Table.RowItem>
                  <Table.RowItem width={68}>
                    <div class="flex items-center">
                      <ButtonIcon
                        icon="fa-solid fa-pen"
                        href={route('admin.games.edit', { slug: game.slug })}
                        data-tooltip="Modifier"
                      />
                      <form
                        action={`${route('admin.games.delete', { id: game.id })}?_method=DELETE`}
                        method="post"
                        up-confirm="Voulez-vous vraiment supprimer le jeu ?"
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
