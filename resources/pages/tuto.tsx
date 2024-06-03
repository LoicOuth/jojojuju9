import { AppLayout } from '#layouts/app.layout'
import { Vite } from '#start/view'

interface TutoProps {
  winrarLink: string
  utorrentLink: string
  daemonLink: string
}

export const TutoPage = (props: TutoProps) => {
  const { winrarLink, daemonLink, utorrentLink } = props

  return (
    <AppLayout title="Tutoriels">
      <>
        <h1 class="text-center underline my-10">Comment installer un jeu ou un logiciel ?</h1>

        <div class="max-width-wrapper flex column gap-5">
          <article>
            <p>
              Tout d'abord, vous aurez besoin de WinRAR et de µtorrent (ou d'un logiciel similaire)
              avant de commencer le téléchargement et l'installation du jeu ou logiciel. Si vous
              êtes sur une version antérieure à Windows 7, il vous faut aussi Deamon Tool.
            </p>
          </article>
          <article>
            <ul style="list-style-type: decimal;">
              <h5>
                <li>Vous avez un fichier ".iso"</li>
              </h5>
              <div class="my-5">
                <p>
                  Si vous êtes sur Windows 7/8/10 ou 11, ouvrez le fichier ".iso" directement sur
                  votre PC.
                </p>
                <p>
                  Si vous êtes sur une version antérieur à Windows 7, ouvrez le via Deamon Tool.
                </p>
                <p>Pour toutes les versions de Windows, vous pouvez aussi l'ouvrir avec WinRar.</p>
                <p>
                  A l'intérieur, vous trouverez un fichier ".exe", c'est un installateur
                  (Généralement nommé "Setup.exe"*) exécutez le.
                </p>
                <p>Suivez pas à pas les instructions pendant l'installation.</p>
              </div>

              <h5 class="underline mt-10">
                <li>Vous avez un fichier sous la forme "Setup.exe"</li>
              </h5>
              <div class="my-5">
                <p>Le fichier "Setup.exe"*, c'est un installateur exécutez le.</p>
                <p>Suivez pas à pas les instructions pendant l'installation.</p>
              </div>

              <h5 class="underline mt-10">
                <li>Vous n'avez ni de fichier ".iso" ni "Setup.exe"</li>
              </h5>
              <div class="my-5">
                <p>C'est le cas de figure le plus facile ! Vous n'avez rien de plus à faire.</p>
                <p>Cliquez simplement sur fichier ".exe" et c'est parti.</p>
                <span class="text-caption">
                  <p>
                    Parfois, il est nécéssaire de déplacer les fichiers "cracks" dans le répertoire
                    du jeu.
                  </p>
                  <p>Ces fichiers se trouve généralement inclu dans les fichiers téléchargés !</p>
                </span>
              </div>
            </ul>
          </article>
          <article>
            <h5 class="underline">Les logiciels utiles</h5>
            <div class="flex gap-5 items-center tuto__article p-7">
              <a href={utorrentLink} target="_blank">
                <Vite.Image
                  src="resources/assets/images/utorrent_logo.png"
                  alt="utorrent"
                  class="tuto__logo"
                />
              </a>
              <a href={winrarLink} target="_blank">
                <Vite.Image
                  src="resources/assets/images/winrar_logo.png"
                  alt="winrar"
                  class="tuto__logo"
                />
              </a>
              <a href={daemonLink} target="_blank">
                <Vite.Image
                  src="resources/assets/images/daemon_tools_logo.png"
                  alt="daemon tools"
                  class="tuto__logo"
                />
              </a>
            </div>
          </article>
        </div>
      </>
    </AppLayout>
  )
}
