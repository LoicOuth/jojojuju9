import { Button } from '#components/button'
import { Form } from '#components/forms/index'
import { AdminLayout } from '#layouts/admin.layout'
import Game from '#models/game'
import { csrfField, route } from '#start/view'
import { HttpContext } from '@adonisjs/core/http'

interface UpdateVersionGameProps {
  games: Game[]
}

export const UpdateVersionGame = (props: UpdateVersionGameProps) => {
  const { games } = props

  const { session } = HttpContext.getOrFail()
  return (
    <AdminLayout title="Mettre à jour les versions des jeux" returnHref={route('admin.games')}>
      <form action={`${route('admin.games.version.update')}?_method=PUT`} method="POST">
        {csrfField()}
        <div class="flex wrap gap-5">
          {games.map((game, index) => (
            <div class="flex items-center gap-2">
              <span>{game.name} :</span>
              <input type="hidden" name={`games[${index}][id]`} value={game.id.toString()} />
              <Form.Group name={`games[${index}][version]`} defaultValue={game.version} />
            </div>
          ))}
        </div>
        <Button text="Mettre à jour" type="submit" class="mt-5" />
      </form>
    </AdminLayout>
  )
}
