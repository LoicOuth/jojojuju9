import { Table } from '#components/table/index'
import { AppLayout } from '#layouts/app.layout'
import Hack from '#models/hack'
import { Vite } from '#start/view'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

interface HacksProps {
  hacks: ModelPaginatorContract<Hack>
  winrarLink: string
  utorrentLink: string
  daemonLink: string
}

export const HacksPage = (props: HacksProps) => {
  const { hacks, daemonLink, utorrentLink, winrarLink } = props

  const headers = [
    'Jeu',
    'Type de hack',
    'Téléchargement',
    'Logiciel nécessaire',
    'Modifié le',
    "Tuto d'installation",
  ]

  return (
    <AppLayout title="Hacks">
      <>
        <h1 class="text-center underline my-10">Les hacks</h1>

        <div class="max-width-wrapper flex column gap-5">
          <Table.Index
            headers={headers}
            nbPage={hacks.lastPage}
            searchPlaceholder="Rechercher un hack"
            class="mt-5"
            overflowed
          >
            <>
              {hacks.map((hack) => (
                <Table.Row>
                  <>
                    <Table.RowItem>{hack.game}</Table.RowItem>
                    <Table.RowItem>{hack.type}</Table.RowItem>
                    <Table.RowItem width={200}>
                      <div class="flex">
                        <a href={hack.link} target="_blank" class="flex gap-2 items-center link">
                          <span>Télécharger</span>
                          <i class="fa-solid fa-download" />
                        </a>
                      </div>
                    </Table.RowItem>
                    <Table.RowItem width={200}>
                      <div class="flex gap-2 items-center">
                        {hack.requiredUtorrent ? (
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
                        {hack.requiredWinrar ? (
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
                        {hack.requiredDaemon ? (
                          <a href={daemonLink} target="_blank">
                            <Vite.Image
                              src="resources/assets/images/daemon_tools_logo.png"
                              alt="daemon"
                              class="show_game__logo"
                            />
                          </a>
                        ) : (
                          ''
                        )}
                      </div>
                    </Table.RowItem>
                    <Table.RowItem>
                      {hack.updatedAt.toFormat('F', { locale: 'fr-FR' })}
                    </Table.RowItem>
                    <Table.RowItem width={160}>
                      {hack.youtube ? (
                        <div class="flex">
                          <a href={hack.youtube} target="_blank">
                            <Vite.Image
                              src="resources/assets/images/youtube_logo.png"
                              alt="youtube logo"
                              class="show_game__logo"
                            />
                          </a>
                        </div>
                      ) : (
                        ''
                      )}
                    </Table.RowItem>
                  </>
                </Table.Row>
              ))}
            </>
          </Table.Index>
        </div>
      </>
    </AppLayout>
  )
}
