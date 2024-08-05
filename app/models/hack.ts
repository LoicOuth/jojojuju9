import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'

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
  @column()
  declare isValidated: boolean
  @column()
  declare createdById: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, { foreignKey: 'createdById' })
  declare createdBy: BelongsTo<typeof User>
}
