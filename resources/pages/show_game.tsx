import { ButtonIcon } from '#components/button'
import { Chip } from '#components/chip'
import { Table } from '#components/table/index'
import { AppLayout } from '#layouts/app.layout'
import Game from '#models/game'
import { Vite } from '#start/view'

interface ShowGamePageProps {
  game: Game
  winrarLink: string
  utorrentLink: string
}

export const ShowGamePage = (props: ShowGamePageProps) => {
  const { game, utorrentLink, winrarLink } = props

  const downloadHeaders = [
    'Nom',
    'Lien du téléchargement',
    'Logiciels requis',
    'Avec crack multijoueur',
  ]

  return (
    <AppLayout title={game.name}>
      <>
        <img src={game.picture} alt={game.name} class="show_game__image" />
        <div class="max-width-wrapper pb-5">
          <div class="flex items-center mt-5">
            <h1 class="flex-1">{game.name}</h1>
            <form>
              <ButtonIcon type="submit" icon="fa-regular fa-heart" size="lg" />
            </form>
          </div>
          <div class="mt-2">
            <Chip text={`Version ${game.version}`} color="success" />
            <div class="mt-1">Tags: {game.kinds.map((kind) => kind.name).join(', ')}</div>
          </div>

          <div class="flex column gap-12 mt-12">
            <div>
              <h3 class="underline">Description</h3>
              <p class="mt-5 text-lg">{game.description}</p>
            </div>

            <div>
              <h3 class="underline">Configuration mininale</h3>
              <ul class="mt-5 text-lg gap-3 flex column">
                <li>
                  <strong>OS : </strong> {game.os}
                </li>
                <li>
                  <strong>Processeur : </strong> {game.cpu}
                </li>
                <li>
                  <strong>Memoire : </strong> {game.memory}
                </li>
                <li>
                  <strong>Carte graphique : </strong> {game.gpu}
                </li>
                <li>
                  <strong>Espace de Stockage : </strong> {game.storage}
                </li>
              </ul>
            </div>
            <div class="text-lg">{game.content}</div>
            <div>
              <h3 class="underline">Téléchargements</h3>

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
                        <Table.RowItem>{link.name}</Table.RowItem>
                        <Table.RowItem>
                          <a href={link.url} target="_blank" class="flex gap-2 items-center link">
                            <span>Télécharger</span>
                            <i class="fa-solid fa-download" />
                          </a>
                        </Table.RowItem>
                        <Table.RowItem>
                          <div class="flex gap-2 items-center">
                            <a href={utorrentLink} target="_blank">
                              <Vite.Image
                                src="resources/assets/images/utorrent_logo.png"
                                alt="utorrent"
                                class="show_game__logo"
                              />
                            </a>
                            <a href={winrarLink} target="_blank">
                              <Vite.Image
                                src="resources/assets/images/winrar_logo.png"
                                alt="winrar"
                                class="show_game__logo"
                              />
                            </a>
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
          </div>
        </div>
      </>
    </AppLayout>
  )
}
