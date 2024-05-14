import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column } from '@adonisjs/lucid/orm'
import Comment from '#models/comment'
import { type BelongsTo } from '@adonisjs/lucid/types/relations'
import User from '#models/user'

export default class Response extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare content: string
  @column()
  declare userId: number
  @column()
  declare commentId: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Comment)
  declare comment: BelongsTo<typeof Comment>
  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
}
