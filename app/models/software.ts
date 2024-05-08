import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'

export default class Software extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare name: string
  @column()
  declare slug: string
  @column()
  declare description: string
  @column()
  declare content: string
  @column()
  declare developer: string
  @column()
  declare version: string
  @column()
  declare picture: string
  @column()
  declare os: string
  @column()
  declare storage: string
  @column()
  declare userId: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
