import { AppLayout } from '#layouts/app.layout'

export const TermsConditionsPage = () => {
  return (
    <AppLayout title="Termes et conditions d'utilisations">
      <>
        <h1 class="text-center underline my-10">Termes et conditions d'utilisations</h1>

        <div class="max-width-wrapper flex column gap-5">
          <article>
            <h3>Informations Légales</h3>
            <p class="mt-3 p-5 terms-conditions__p">
              Nous ne craquons pas les jeux et les logiciels, nous les partageons juste. En aucun
              cas nous sommes responsable des causes dù au piratage Jojojuju9.com est absolument
              légale et ne contient que des liens trouvé sur d'autres sites. (Nous n'hébergeons rien
              sur notre serveur. Nous publions juste des liens disponibles sur internet.)
            </p>
          </article>
          <article>
            <h3>Contenu protégé par droits d'auteurs</h3>
            <div class="mt-3 p-5 terms-conditions__p">
              <p>Jojojuju9.com est conforme avec la Digital Millennium Copyright Act (DMCA).</p>
              <p>
                Nous apportons une réponse rapide à tous avis d’infraction afin de prendre les
                mesures appropriées conforme avec la DMCA ainsi que des autres lois applicables en
                matière de droits d’auteurs.
              </p>
              <p>
                Si votre jeu/logiciel protégé par des droits d’auteur a été publié ici et que vous
                souhaitez que ce jeu/logiciel soit supprimé du site, vous devez avoir une
                communication écrite qui détaille les informations listées dans la section suivante.
              </p>
              <p>
                Si vous avez des questions ou des préoccupations, n’hésitez pas à nous contacter par
                e-mail. Les éléments suivants doivent être inclus dans votre réclamation d’atteinte
                aux droits d’auteur:
                <ul>
                  <li>Informations complètes</li>
                  <li>Adresse</li>
                  <li>Téléphone</li>
                  <li>Mail</li>
                  <li>Site web</li>
                </ul>
              </p>
              <p>
                Envoyez l'infraction à :{' '}
                <a href="mailto:fightdu10@gmail.com" class="link">
                  fightdu10@gmail.com
                </a>
                <p>
                  Nous n'ignorons pas les emails et nous nous engageons à vous répondre dans les
                  plus brefs délais. Si vous ne recevez pas de réponse après le temps impartit,
                  rafraichissez la page sur laquelle vous avez fais une réclamation pour droits
                  d'auteurs, vous verrez donc que la page à été supprimée !
                </p>
              </p>
              <p>
                <strong>Temps de réponse maximum : 72 Heures</strong>
              </p>
            </div>
          </article>
          <article>
            <h3>Piratage</h3>
            <div class="mt-3 p-5 terms-conditions__p">
              <p>Ce site n'encourage pas le piratage.</p>
              <p>Ces liens sont destinés uniquement à des fins de sauvegardes.</p>
              <p>Ne téléchargez pas les fichiers si vous ne disposez pas du support d'origine.</p>
              <p>
                Pour tous nos visiteurs, n'oubliez pas de soutenir les développeurs des jeux et des
                logiciels.
              </p>
              <p>Si vous aimez un jeu/logiciel, alors achetez le !</p>
            </div>
          </article>
          <article>
            <h3>Gestion des données personnelles</h3>
            <div class="mt-3 p-5 terms-conditions__p">
              <p>
                Nous tenons à vous informer que les données stockées dans notre application ne sont
                ni utilisées à des fins commerciales ni communiquées à des tiers. Votre vie privée
                est notre priorité. Vous avez également la possibilité de supprimer votre compte à
                tout moment, en toute simplicité. Si vous avez des questions ou des préoccupations,
                n'hésitez pas à nous contacter. Merci de votre confiance.
              </p>
            </div>
          </article>
        </div>
      </>
    </AppLayout>
  )
}
