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

  const headers = ['Nom du jeu', 'Version', 'actions']

  return (
    <AdminLayout title="Jeux">
      <div class="flex column">
        <div>
          <Button
            text="Ajouter un jeu"
            href={route('admin.games.create')}
            icon="fa-solid fa-plus"
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
                  <Table.RowItem>{game.version}</Table.RowItem>
                  <Table.RowItem width={68}>
                    <div class="flex align-center">
                      <ButtonIcon icon="fa-solid fa-pen" />
                      <form
                        action={`${route('admin.games.delete', { id: game.id })}?_method=DELETE`}
                        method="post"
                        up-confirm="Voulez-vous vraiment supprimer le jeu ?"
                      >
                        {csrfField()}
                        <ButtonIcon type="submit" icon="fa-solid fa-trash" color="error" />
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
