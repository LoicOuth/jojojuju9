import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import User from '#models/user'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import Game from '#models/game'
import Software from '#models/software'

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
  declare games: BelongsTo<typeof Game>
  @belongsTo(() => Software)
  declare softwares: BelongsTo<typeof Software>
}
