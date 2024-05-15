import { DateTime } from 'luxon'
import { BaseModel, column, manyToMany } from '@adonisjs/lucid/orm'
import Game from '#models/game'
import { type ManyToMany } from '@adonisjs/lucid/types/relations'
import Software from '#models/software'

export default class Kind extends BaseModel {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare name: string
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @manyToMany(() => Game)
  declare games: ManyToMany<typeof Game>
  @manyToMany(() => Software)
  declare softwares: ManyToMany<typeof Software>
}
