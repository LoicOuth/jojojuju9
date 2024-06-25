import { Visits } from '#components/visits'
import db from '@adonisjs/lucid/services/db'

export default class VisitisController {
  async render() {
    const count = await db.from('daily_analytics').count('* as total')

    return <Visits count={count[0].total} />
  }
}
