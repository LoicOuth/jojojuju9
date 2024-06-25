import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class MonthlyAnalytic extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare month: number
  @column()
  declare year: number
  @column()
  declare visit: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
