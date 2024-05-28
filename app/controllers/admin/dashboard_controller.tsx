import { Admin } from '#pages/admin/index'
import db from '@adonisjs/lucid/services/db'

export default class DashboardController {
  async render() {
    const users = await db.from('users').count('* as total')
    const games = await db.from('games').count('* as total')
    const softwares = await db.from('softwares').count('* as total')

    return (
      <Admin.Dashboard
        userCount={users[0].total}
        gameCount={games[0].total}
        softwareCount={softwares[0].total}
      />
    )
  }
}
