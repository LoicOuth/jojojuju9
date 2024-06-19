import { Button } from '#components/button'
import { Form } from '#components/forms/index'
import { AdminLayout } from '#layouts/admin.layout'
import Game from '#models/game'
import { csrfField, route } from '#start/view'

interface UpdateVersionGameProps {
  games: Game[]
}

export const UpdateVersionGame = (props: UpdateVersionGameProps) => {
  const { games } = props

  return (
    <AdminLayout title="Mettre à jour les versions des jeux" returnHref={route('admin.games')}>
      <form
        action={`${route('admin.games.version.update')}?_method=PUT`}
        method="POST"
        enctype="multipart/form-data"
      >
        {csrfField()}
        <div id="update-version-container" class="flex column gap-5">
          <input
            id="version-search"
            type="search"
            class="form_control form__search"
            placeholder="Rechercher un jeu"
            oninput="search()"
          />
          {games.map((game, index) => (
            <div id={game.name} class="flex-1 flex items-center gap-2">
              <input type="hidden" name={`games[${index}][id]`} value={game.id.toString()} />
              <Form.Group
                title={game.name}
                name={`games[${index}][version]`}
                defaultValue={game.version}
              />
            </div>
          ))}
        </div>
        <Button text="Mettre à jour" type="submit" class="mt-5" />
      </form>
    </AdminLayout>
  )
}
