import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Hack extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare game: string
  @column()
  declare type: string
  @column()
  declare link: string
  @column()
  declare youtube?: string
  @column()
  declare requiredUtorrent: boolean
  @column()
  declare requiredWinrar: boolean
  @column()
  declare requiredDaemon: boolean
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime
}
