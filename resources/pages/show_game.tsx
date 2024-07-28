import { ButtonIcon } from '#components/button'
import { Divider } from '#components/divider'
import { Table } from '#components/table/index'
import { AppLayout } from '#layouts/app.layout'
import Game from '#models/game'
import { Vite, csrfField, route } from '#start/view'
import { HttpContext } from '@adonisjs/core/http'

interface ShowGamePageProps {
  game: Game
  winrarLink: string
  utorrentLink: string
  daemonLink: string
}

export const ShowGamePage = async (props: ShowGamePageProps) => {
  const { game, utorrentLink, winrarLink, daemonLink } = props
  const { auth } = HttpContext.getOrFail()
  await auth.check()
  await auth.user?.load('favoriteGames')

  const downloadHeaders = ['Nom', 'Lien du téléchargement', 'Logiciels requis', 'Multijoueur']

  if (!game.links[0]?.name) {
    downloadHeaders.shift()
  }

  return (
    <AppLayout title={game.name}>
      <>
        <img src={game.picture} alt={game.name} class="show_game__image" />
        <div class="max-width-wrapper pb-5">
          <div class="flex items-center mt-5">
            <h1 class="flex-1">{game.name}</h1>
            {auth.user && (
              <form
                action={`${route('games.favorite', { id: game.id })}?_method=PUT`}
                method="POST"
              >
                {csrfField()}
                <ButtonIcon
                  type="submit"
                  icon={`${auth.user.isGameInFavorite(game.id) ? 'fa-solid' : 'fa-regular'} fa-heart`}
                  size="lg"
                />
              </form>
            )}
          </div>

          {game.youtube && (
            <div class="mt-12">
              <iframe
                width="1000"
                height="500"
                src={`http://www.youtube.com/embed/${game.youtube.split('?v=')[1]}`}
                title="YouTube video player"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
                style="widt"
              />
            </div>
          )}

          <div class="show_game__section">
            <h3 class="yellow">Infos</h3>
            <ul class="mt-5 text-lg gap-3 flex column">
              <li>
                <strong>Version : </strong> {game.version}
              </li>
              <li>
                <strong>Développeur : </strong> {game.developer}
              </li>
              {game.editor && (
                <li>
                  <strong>Éditeur : </strong> {game.editor}
                </li>
              )}
              <li>
                <strong>Mode : </strong> {game.mode}
              </li>
              <li>
                <strong>Genres : </strong> {game.kinds.map((kind) => kind.name).join(',')}
              </li>
            </ul>
          </div>

          <div class="show_game__section">
            <h3 class="yellow">Configuration mininale</h3>
            <ul class="mt-5 text-lg gap-3 flex column">
              <li>
                <strong>OS : </strong> {game.os}
              </li>
              <li>
                <strong>Processeur : </strong> {game.cpu}
              </li>
              <li>
                <strong>Memoire : </strong> {game.memory}{' '}
                {game.memory.includes('RAM') ? '' : 'de RAM'}
              </li>
              <li>
                <strong>Carte graphique : </strong> {game.gpu}
              </li>
              <li>
                <strong>Espace de Stockage : </strong> {game.storage}{' '}
                {game.storage.includes('disponible') ? '' : "d'espace disponible"}
              </li>
              {game.notes && (
                <li>
                  <strong>Notes supplémentaires : </strong>
                  <span class="text-lg text-error ">{game.notes}</span>
                </li>
              )}
            </ul>
          </div>

          <div class="flex column show_game__section">
            <div class="mb-8">
              <h3 class="yellow">Description</h3>
              <p class="mt-5 text-lg text-preline">{game.description}</p>
            </div>

            <div class="text-lg">{game.content}</div>
          </div>

          <div class="show_game__section">
            <h3 class="yellow">Téléchargements</h3>

            <Table.Index
              withPagination={false}
              withSearch={false}
              headers={downloadHeaders}
              class="mt-5"
            >
              <>
                {game.links?.map((link) => (
                  <Table.Row>
                    <>
                      {link.name && <Table.RowItem>{link.name}</Table.RowItem>}
                      <Table.RowItem>
                        <div class="flex">
                          <a href={link.url} target="_blank" class="flex gap-2 items-center link">
                            <span>Télécharger</span>
                            <i class="fa-solid fa-download" />
                          </a>
                        </div>
                      </Table.RowItem>
                      <Table.RowItem>
                        <div class="flex gap-2 items-center">
                          {link.requiredUtorrent ? (
                            <a href={utorrentLink} target="_blank">
                              <Vite.Image
                                src="resources/assets/images/utorrent_logo.png"
                                alt="utorrent"
                                class="show_game__logo"
                              />
                            </a>
                          ) : (
                            ''
                          )}
                          {link.requiredWinrar ? (
                            <a href={winrarLink} target="_blank">
                              <Vite.Image
                                src="resources/assets/images/winrar_logo.png"
                                alt="winrar"
                                class="show_game__logo"
                              />
                            </a>
                          ) : (
                            ''
                          )}
                          {link.requiredDaemon ? (
                            <a href={daemonLink} target="_blank">
                              <Vite.Image
                                src="resources/assets/images/daemon_tools_logo.png"
                                alt="winrar"
                                class="show_game__logo"
                              />
                            </a>
                          ) : (
                            ''
                          )}
                        </div>
                      </Table.RowItem>
                      <Table.RowItem>
                        <i
                          class={`show_game__icon fa-solid ${link.multiplayer ? 'fa-check' : 'fa-xmark'}`}
                        />
                      </Table.RowItem>
                    </>
                  </Table.Row>
                ))}
              </>
            </Table.Index>
          </div>

          <Divider />

          <div class="mt-5">
            <h3 class="underline mb-5">Avis de la communauté</h3>
            <jojo-comments game-id={game.id.toString()} user-id={auth.user?.id.toString()} />
          </div>
        </div>
      </>
    </AppLayout>
  )
}
