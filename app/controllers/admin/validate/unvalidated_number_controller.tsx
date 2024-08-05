import { UnvalidatedNumber } from '#components/unvalidated_number'
import db from '@adonisjs/lucid/services/db'

export default class UnvalidatedNumberController {
  async render() {
    const unvalidatedGameCount = await db
      .from('games')
      .where('is_validated', false)
      .count('* as total')
    const unvalidatedSoftwareCount = await db
      .from('softwares')
      .where('is_validated', false)
      .count('* as total')
    const unvalidatedHackCount = await db
      .from('hacks')
      .where('is_validated', false)
      .count('* as total')
    const unvalidatedPatchCount = await db
      .from('patches')
      .where('is_validated', false)
      .count('* as total')
    const unvalidatedQuestionCount = await db
      .from('questions')
      .where('is_validated', false)
      .count('* as total')

    const count =
      unvalidatedGameCount[0].total +
      unvalidatedSoftwareCount[0].total +
      unvalidatedHackCount[0].total +
      unvalidatedPatchCount[0].total +
      unvalidatedQuestionCount[0].total

    return <UnvalidatedNumber count={count} />
  }
}
