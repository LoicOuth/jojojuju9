import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Game from '#models/game'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import Software from '#models/software'

export default class Link extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare name: string
  @column()
  declare url: string
  @column()
  declare requiredUtorrent: boolean
  @column()
  declare requiredWinrar: boolean
  @column()
  declare requiredDaemon: boolean
  @column()
  declare multiplayer: boolean
  @column()
  declare gameId?: number
  @column()
  declare softwareId?: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Game)
  declare games: BelongsTo<typeof Game>
  @belongsTo(() => Software)
  declare softwares: BelongsTo<typeof Software>
}
