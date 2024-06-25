import DailyAnalytic from '#models/daily_analytic'
import MonthlyAnalytic from '#models/monthly_analytic'
import db from '@adonisjs/lucid/services/db'
import scheduler from 'adonisjs-scheduler/services/main'

scheduler
  .call(async () => {
    const currentDate = new Date()
    currentDate.setDate(currentDate.getDate() - 5)

    const month = currentDate.getMonth() + 1
    const year = currentDate.getFullYear()

    const count = await db.from('daily_analytics').count('* as total')
    const montlyAnalyctics = await MonthlyAnalytic.firstOrCreate(
      { month, year },
      { month, year, visit: 0 }
    )
    montlyAnalyctics.visit += count[0].total
    await montlyAnalyctics.save()

    await DailyAnalytic.query().delete()
  })
  .daily()
