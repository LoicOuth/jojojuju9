import { Table } from '#components/table/index'
import { AppLayout } from '#layouts/app.layout'
import Patch from '#models/patch'
import { Vite } from '#start/view'
import { ModelPaginatorContract } from '@adonisjs/lucid/types/model'

interface PatchsProps {
  patchs: ModelPaginatorContract<Patch>
  winrarLink: string
  utorrentLink: string
  daemonLink: string
}

export const PatchsPage = (props: PatchsProps) => {
  const { patchs, daemonLink, utorrentLink, winrarLink } = props

  const headers = [
    'Programme',
    'Type de hack',
    'Téléchargement',
    'Logiciel nécessaire',
    'Modifié le',
    "Tuto d'installation",
  ]

  return (
    <AppLayout title="Patchs/Fixs/Astuces">
      <>
        <h1 class="text-center underline my-10">Les Patchs/Fixs/Astuces</h1>

        <div class="max-width-wrapper flex column gap-5">
          <Table.Index
            headers={headers}
            nbPage={patchs.lastPage}
            searchPlaceholder="Rechercher un patch/fix/astuce"
            class="mt-5"
            overflowed
          >
            <>
              {patchs.map((patch) => (
                <Table.Row>
                  <>
                    <Table.RowItem>{patch.program}</Table.RowItem>
                    <Table.RowItem>{patch.type}</Table.RowItem>
                    <Table.RowItem width={200}>
                      <div class="flex">
                        <a href={patch.link} target="_blank" class="flex gap-2 items-center link">
                          <span>Télécharger</span>
                          <i class="fa-solid fa-download" />
                        </a>
                      </div>
                    </Table.RowItem>
                    <Table.RowItem width={200}>
                      <div class="flex gap-2 items-center">
                        {patch.requiredUtorrent ? (
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
                        {patch.requiredWinrar ? (
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
                        {patch.requiredDaemon ? (
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
                      {patch.updatedAt.toFormat('F', { locale: 'fr-FR' })}
                    </Table.RowItem>
                    <Table.RowItem width={160}>
                      {patch.youtube ? (
                        <div class="flex">
                          <a href={patch.youtube} target="_blank">
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
