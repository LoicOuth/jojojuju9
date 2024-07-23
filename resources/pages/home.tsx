import { AppLayout } from '#layouts/app.layout'
import Game from '#models/game'
import Software from '#models/software'
import { Vite, route } from '#start/view'

interface HomePageProps {
  lastAdd: (Game | Software)[]
  lastUpdatedDate: string
}

export const HomePage = (props: HomePageProps) => {
  const { lastAdd, lastUpdatedDate } = props

  return (
    <AppLayout title="Accueil">
      <>
        <div class="home__section-1 pb-5">
          <div class="max-width-wrapper">
            <div class="flex justify-center">
              <Vite.Image
                src={'resources/assets/images/jojojuju9_logo.png'}
                alt="logo"
                class="home__section-1__logo"
              />
            </div>
            <h1 class="text-center text-bold">
              Trouve le <span class="text-primary">crack</span> de ton jeu ou de ton logiciel en un
              clic grâce à <span class="text-primary">Jojojuju9 Crack&Hack</span>
            </h1>

            <p class="text-center mt-10">
              Recherchez, suivez nos tutoriels détaillés, téléchargez le crack et installez-le, le
              tout gratuitement, sans publicités et approuvé sans virus !
            </p>

            <h4 class="text-center mt-10">
              Rejoins une communauté actif de plus de 15 000 personnes
            </h4>

            <div class="flex items-center justify-center gap-10">
              <a class="home__section-1__social">
                <Vite.Image src="resources/assets/images/discord_logo.png" alt="Discord logo" />
              </a>
              <a class="home__section-1__social">
                <Vite.Image src="resources/assets/images/youtube_logo.png" alt="Youtube logo" />
              </a>
              <a class="home__section-1__social">
                <Vite.Image src="resources/assets/images/instagram_logo.png" alt="Instagram logo" />
              </a>
            </div>

            <div class="flex justify-center">
              <div class="flex items-center home__section-1__next">
                <a href="#next">Découvrir les dernières nouveautés</a>
                <i class="fa-solid fa-arrow-down ml-5" />
              </div>
            </div>
          </div>
        </div>

        <div id="next" class="home__section-2">
          <div class="max-width-wrapper">
            <h1 class="underline text-center">Dernières nouveautés</h1>
            <div class="flex column gap-5 mt-12">
              {lastAdd.map((item) => (
                <div class="flex gap-5 home__section-2__item">
                  <img src={item.picture} alt={item.name} />
                  <div class="flex column gap-3 flex-1">
                    <h4>{item.name}</h4>
                    <span class="text-caption">
                      Ajouté le {item.createdAt.setLocale('fr').toLocaleString()}
                    </span>
                    <p>{item.description}</p>

                    <a
                      href={route(item instanceof Game ? 'games.show' : 'softwares.show', {
                        slug: item.slug,
                      })}
                      class="text-primary gap-5 home__section-2__item__text"
                    >
                      En savoir plus
                      <i class="fa-solid fa-arrow-right ml-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div class="home__section-3">
            <div class="max-width-wrapper p-5">
              <div class="flex justify-center items-center gap-12 home__section-3__container">
                <div class="flex-1 flex column items-center">
                  <i class="fa-solid fa-arrows-spin mb-5 home__section-3__container__icon" />
                  <h5 class="text-center mb-2">Dernière mise à jour des cracks/hacks</h5>
                  <span>{lastUpdatedDate}</span>
                </div>
                <div class="flex-1 flex column items-center">
                  <i class="fa-solid fa-circle-plus mb-5 home__section-3__container__icon" />
                  <h5 class="text-center mb-2">Dernier ajout</h5>
                  <span>{lastAdd[0].createdAt.setLocale('fr').toFormat('dd/LL/yyyy HH:mm')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </>
    </AppLayout>
  )
}
