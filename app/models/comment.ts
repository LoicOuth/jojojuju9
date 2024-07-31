import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import { type HasMany, type BelongsTo } from '@adonisjs/lucid/types/relations'
import Game from '#models/game'
import Software from '#models/software'
import Response from '#models/response'

export default class Comment extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare content: string
  @column()
  declare userId: number
  @column()
  declare gameId?: number
  @column()
  declare softwareId?: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
  @belongsTo(() => Game)
  declare game: BelongsTo<typeof Game>
  @belongsTo(() => Software)
  declare software: BelongsTo<typeof Software>
  @hasMany(() => Response)
  declare responses: HasMany<typeof Response>
}
