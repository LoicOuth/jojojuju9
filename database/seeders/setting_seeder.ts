import Setting from '#models/setting'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

export default class extends BaseSeeder {
  async run() {
    await Setting.createMany([
      {
        code: 'defaultContent',
        name: 'Contenu par défaut',
        decimalValue: null,
        stringValue: `<h4 class="underline">Procédure d'installation :</h3> 
          <br /> 
          <br /> 
          <h4 class="underline">Comment jouer en ligne ?</h3>`,
      },
      {
        code: 'operateController',
        decimalValue: null,
        name: 'Comment faire fonctionner vos manettes',
        stringValue: `<h4 class="underline">Comment faire fonctionner vos manettes ?</h4> 
          <br /> 
          <ol>
          <li>Ouvrir Steam</li>
          <li>Ouvrir la recherche Windows (appuyez sur Windows + R sur votre clavier)</li>
          <li>Entrer ici : steam://install/480</li>
          <li>Télécharger et installer "Spacewar" (2MB, ne prend pas de place)</li>
          <li>Après l'avoir installé, dans votre bibliothèque Steam, clic droit sur "Spacewar" puis appuyez sur "Propriétés"</li>
          <li>Séléctionner "Contrôleurs", puis sur la liste déroulante séléctionner "Activer Steam Input" ou "Désactiver Steam Input"</li>
          <ul>
              <li><i>(Faire varier ce paramètre (inverser activer/désactiver) si la manette ne fonctionne toujours pas)</i></li>
          </ul>
          <li>Démarrer le jeu !</li>
      </ol>`,
      },
      {
        code: 'utorrentLink',
        decimalValue: null,
        name: 'Liens de téléchargement pour UTorrent',
        stringValue: `https://link-center.net/537207/utorrent`,
      },
      {
        code: 'winrarLink',
        decimalValue: null,
        name: 'Liens de téléchargement pour Winrar',
        stringValue: `https://link-center.net/537207/winrar`,
      },
      {
        code: 'daemonLink',
        decimalValue: null,
        name: 'Liens de téléchargement pour daemon tools',
        stringValue: `https://direct-link.net/537207/deamons-tools-pro`,
      },
    ])
  }
}
