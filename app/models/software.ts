import { DateTime } from 'luxon'
import { BaseModel, belongsTo, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import User from '#models/user'
import type { ManyToMany, BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import Kind from '#models/kind'
import Link from '#models/link'
import Comment from '#models/comment'

export default class Software extends BaseModel {
  static table = 'softwares'

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
  declare version?: string
  @column()
  declare picture: string
  @column()
  declare os: string
  @column()
  declare storage: string
  @column()
  declare youtube?: string
  @column()
  declare userId: number
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User)
  declare user: BelongsTo<typeof User>
  @manyToMany(() => Kind)
  declare kinds: ManyToMany<typeof Kind>
  @hasMany(() => Link)
  declare links: HasMany<typeof Link>
  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>
  @manyToMany(() => User, { pivotTimestamps: true })
  declare favoriteUsers: ManyToMany<typeof User>
}
