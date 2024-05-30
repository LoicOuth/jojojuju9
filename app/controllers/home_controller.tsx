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

    const lastUpdatedGame = await Game.query().orderBy('updatedAt', 'desc').first()
    const lastUpdatedSoftware = await Software.query().orderBy('updatedAt', 'desc').first()

    let date = ''
    if (lastUpdatedGame && lastUpdatedSoftware) {
      date = (
        lastUpdatedGame.updatedAt > lastUpdatedSoftware.updatedAt
          ? lastUpdatedGame.updatedAt
          : lastUpdatedSoftware.updatedAt
      )
        .setLocale('fr')
        .toFormat('dd/LL/yyyy HH:mm')
    }

    return <HomePage lastAdd={lastAdd} lastUpdatedDate={date} />
  }
}
