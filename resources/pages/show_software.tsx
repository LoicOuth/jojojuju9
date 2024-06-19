import { ButtonIcon } from '#components/button'
import { Chip } from '#components/chip'
import { Divider } from '#components/divider'
import { Table } from '#components/table/index'
import { AppLayout } from '#layouts/app.layout'
import Software from '#models/software'
import { Vite, csrfField, route } from '#start/view'
import { HttpContext } from '@adonisjs/core/http'

interface ShowSoftwarePageProps {
  software: Software
  winrarLink: string
  utorrentLink: string
  daemonLink: string
}

export const ShowSoftwarePage = async (props: ShowSoftwarePageProps) => {
  const { software, utorrentLink, winrarLink, daemonLink } = props
  const { auth } = HttpContext.getOrFail()
  await auth.check()
  await auth.user?.load('favoriteSoftwares')

  const downloadHeaders = ['Nom', 'Lien du téléchargement', 'Logiciels requis']

  if (!software.links[0]?.name) {
    downloadHeaders.shift()
  }

  return (
    <AppLayout title={software.name}>
      <>
        <img src={software.picture} alt={software.name} class="show_game__image" />
        <div class="max-width-wrapper pb-5">
          <div class="flex items-center mt-5">
            <h1 class="flex-1">{software.name}</h1>
            {auth.user && (
              <form
                action={`${route('softwares.favorite', { id: software.id })}?_method=PUT`}
                method="POST"
              >
                {csrfField()}
                <ButtonIcon
                  type="submit"
                  icon={`${auth.user.isSoftwareInFavorite(software.id) ? 'fa-solid' : 'fa-regular'} fa-heart`}
                  size="lg"
                />
              </form>
            )}
          </div>
          <div class="mt-2">
            {software.version && <Chip text={`Version ${software.version}`} color="success" />}
            <div class="mt-1">Tags: {software.kinds.map((kind) => kind.name).join(', ')}</div>
          </div>

          <div class="flex column gap-12 mt-12 mb-12">
            {software.youtube && (
              <iframe
                width="1000"
                height="500"
                src={`http://www.youtube.com/embed/${software.youtube.split('?v=')[1]}`}
                title="YouTube video player"
                referrerpolicy="strict-origin-when-cross-origin"
                allowfullscreen
              />
            )}
            <div>
              <h3 class="underline">Description</h3>
              <p class="mt-5 text-lg">{software.description}</p>
            </div>

            <div>
              <h3 class="underline">Configuration mininale</h3>
              <ul class="mt-5 text-lg gap-3 flex column">
                <li>
                  <strong>OS : </strong> {software.os}
                </li>
                <li>
                  <strong>Espace de Stockage : </strong> {software.storage} d'espace disponible
                </li>
              </ul>
            </div>
            <div class="text-lg">{software.content}</div>
            <div>
              <h3 class="underline">Téléchargements</h3>

              <Table.Index
                withPagination={false}
                withSearch={false}
                headers={downloadHeaders}
                class="mt-5"
                overflowed
              >
                <>
                  {software.links?.map((link) => (
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
                      </>
                    </Table.Row>
                  ))}
                </>
              </Table.Index>
            </div>
          </div>

          <Divider />

          <div class="mt-5">
            <h3 class="underline mb-5">Avis de la communauté</h3>
            <jojo-comments
              software-id={software.id.toString()}
              user-id={auth.user?.id.toString()}
            />
          </div>
        </div>
      </>
    </AppLayout>
  )
}
