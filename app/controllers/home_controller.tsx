import Game from '#models/game'
import Software from '#models/software'
import { HomePage } from '#pages/home'

export default class HomeController {
  async render() {
    const games = await Game.query().orderBy('createdAt', 'desc').limit(3)
    const softwares = await Software.query().orderBy('createdAt', 'desc').limit(3)

    const lastAdd: (Game | Software)[] = [...games, ...softwares]
      .sort((a, b) => b.createdAt.toJSDate().getTime() - a.createdAt.toJSDate().getTime())
      .slice(0, 3)

    const lastUpdatedGame = await Game.query()
      .whereColumn('updated_at', '!=', 'created_at')
      .orderBy('updatedAt', 'desc')
      .first()
    const lastUpdatedSoftware = await Software.query()
      .whereColumn('updated_at', '!=', 'created_at')
      .orderBy('updatedAt', 'desc')
      .first()

    let date = ''
    if (lastUpdatedGame && lastUpdatedSoftware) {
      date = (
        lastUpdatedGame.updatedAt > lastUpdatedSoftware.updatedAt
          ? lastUpdatedGame.updatedAt
          : lastUpdatedSoftware.updatedAt
      )
        .setLocale('fr')
        .toFormat('dd/LL/yyyy HH:mm')
    } else if (lastUpdatedGame) {
      date = lastUpdatedGame.updatedAt.toFormat('F', { locale: 'fr-FR' })
    } else if (lastUpdatedSoftware) {
      date = lastUpdatedSoftware.updatedAt.toFormat('F', { locale: 'fr-FR' })
    }

    return <HomePage lastAdd={lastAdd} lastUpdatedDate={date} />
  }
}
