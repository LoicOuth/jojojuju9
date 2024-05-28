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

    return <HomePage lastAdd={lastAdd} />
  }
}
