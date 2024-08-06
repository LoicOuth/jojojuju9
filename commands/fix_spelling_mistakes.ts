import Game from '#models/game'
import Software from '#models/software'
import { BaseCommand } from '@adonisjs/core/ace'
import type { CommandOptions } from '@adonisjs/core/types/ace'

export default class FixSpellingMistakes extends BaseCommand {
  static commandName = 'fix:spelling-mistakes'
  static description = 'fix spelling mistakes inside games & softwares content'

  static options: CommandOptions = {
    startApp: true,
  }

  async run() {
    const games = await Game.all()
    const softwares = await Software.all()

    for (const game of games) {
      game.content = game.content.replace(/\btout les\b/g, 'tous les')
      game.content = game.content.replace(/\brépertoire de votre jeu\b/g, 'répertoire du jeu')
      game.content = game.content.replace(/\bService de jeu\b/g, 'Services de jeux')
      game.content = game.content.replace(
        /\bles fichiers et dossier\b/g,
        'les fichiers et dossiers'
      )
      game.content = game.content.replace(/\bTéléchargez\b|\bTelechargez\b/g, 'Télécharger')
      game.content = game.content.replace(
        /\bAttendre la fin du téléchargement sur Utorrent\b/g,
        'Attendre la fin du téléchargement'
      )
      game.content = game.content.replace(/\bColler le tout dans\b/g, "Coller l'ensemble dans")

      await game.save()
    }

    for (const software of softwares) {
      software.content = software.content.replace(/\btout les\b/g, 'tous les')
      software.content = software.content.replace(
        /\brépertoire de votre jeu\b/g,
        'répertoire du jeu'
      )
      software.content = software.content.replace(/\bService de jeu\b/g, 'Services de jeux')
      software.content = software.content.replace(
        /\bles fichiers et dossier\b/g,
        'les fichiers et dossiers'
      )
      software.content = software.content.replace(/\bTéléchargez\b|\bTelechargez\b/g, 'Télécharger')
      software.content = software.content.replace(
        /\bAttendre la fin du téléchargement sur Utorrent\b/g,
        'Attendre la fin du téléchargement'
      )
      software.content = software.content.replace(
        /\bColler le tout dans\b/g,
        "Coller l'ensemble dans"
      )

      await software.save()
    }
  }
}
