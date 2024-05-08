import { AppLayout } from '#layouts/app.layout'
import { Vite } from '#start/view'

export const HomePage = () => {
  return (
    <AppLayout title="Accueil">
      <>
        <div class="home__section-1 pb-5">
          <div class="max-width-wrapper">
            <h1 class="text-center text-bold">
              Trouve le <span class="text-primary">crack</span> de ton jeu ou de ton logiciel en un
              clique
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
            </div>

            <div class="flex justify-center">
              <div class="flex items-center home__section-1__next">
                <a href="#next">Voir les derniers ajouts</a>
                <i class="fa-solid fa-arrow-down ml-5" />
              </div>
            </div>
          </div>
        </div>

        <div id="next">nouveau jeux</div>
      </>
    </AppLayout>
  )
}
