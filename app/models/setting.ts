import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'
import { type SettingsCode } from '#types/settings'

export default class Setting extends BaseModel {
  @column({ isPrimary: true })
  declare id: number

  @column()
  declare code: SettingsCode

  @column()
  declare name: string

  @column()
  declare stringValue: string | null

  @column()
  declare decimalValue: number | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
