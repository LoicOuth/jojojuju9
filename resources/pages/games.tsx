import { Card } from '#components/card'
import { Chip } from '#components/chip'
import { Form } from '#components/forms/index'
import { Search } from '#components/search'
import { AppLayout } from '#layouts/app.layout'
import Game from '#models/game'
import { route } from '#start/view'
import { SortText } from '#types/sort'
import { HttpContext } from '@adonisjs/core/http'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

interface GamesPageProps {
  games: ModelPaginatorContract<Game>
}

export const GamesPage = async (props: GamesPageProps) => {
  const { games } = props
  const { request, auth } = HttpContext.getOrFail()
  await auth.check()

  return (
    <AppLayout title="Jeux">
      <div class="max-width-wrapper flex column mt-10 gap-5">
        <Card>
          <>
            <h4>Filtre</h4>
            <div class="flex items-center gap-5 mt-3 wrap">
              <Search placeholder="Rechercher un jeu" />

              <Form.Select
                name="sort"
                options={Object.entries(SortText).map(([value, text]) => ({ text, value }))}
                defaultValue={request.qs().sort}
                query
              />

              {auth.user && (
                <Form.Checkbox
                  name="favorite"
                  title="Favoris"
                  defaultValue={request.qs().favorite}
                  query
                />
              )}
            </div>
          </>
        </Card>
        <div class="flex wrap justify-center gap-5">
          {games.map((game) => (
            <a class="flex-1 games__item" href={route('games.show', { slsug: game.slug })}>
              <Card noPadding clickable>
                <>
                  <img src={game.picture} />
                  <div class="p-3 flex column">
                    <div class="flex items-center">
                      <span class="text-caption flex-1">
                        Mis à jour le {game.updatedAt.toLocaleString()}
                      </span>
                      <span>
                        {game.$extras.comments_count} <i class="fa-solid fa-comment ml-1" />
                      </span>
                    </div>

                    <h4>{game.name}</h4>

                    <div class="flex items-center gap-2 mt-2">
                      <Chip text={game.version} color="success" />
                      {game.multiplayer ? <Chip text="Multijoueur" color="yellow" /> : ''}
                      {game.withDlc ? <Chip text="Avec les DLC" color="blue" /> : ''}
                    </div>

                    <div class="mt-2">Tags: {game.kinds.map((kind) => kind.name).join(', ')}</div>
                  </div>
                </>
              </Card>
            </a>
          ))}
        </div>
      </div>
    </AppLayout>
  )
}
