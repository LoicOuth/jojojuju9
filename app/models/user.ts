import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { Role } from '#types/roles'
import Game from '#models/game'
import { type ManyToMany, type HasMany } from '@adonisjs/lucid/types/relations'
import Software from '#models/software'

const AuthFinder = withAuthFinder(() => hash.use('scrypt'), {
  uids: ['email', 'username'],
  passwordColumnName: 'password',
})

export default class User extends compose(BaseModel, AuthFinder) {
  @column({ isPrimary: true })
  declare id: number
  @column()
  declare username: string
  @column()
  declare email: string
  @column()
  declare password: string
  @column()
  declare avatar: string | null
  @column()
  declare isActive: boolean
  @column({
    prepare: (value) => JSON.stringify(value),
  })
  declare roles: Role[] | null
  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime
  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime | null

  @hasMany(() => Game)
  declare games: HasMany<typeof Game>
  @hasMany(() => Software)
  declare softwares: HasMany<typeof Game>
  @manyToMany(() => Game, { pivotTimestamps: true })
  declare favoriteGames: ManyToMany<typeof Game>

  isAdmin = () => this.roles?.includes(Role.Admin)
  isModerator = () => this.roles?.includes(Role.Moderator) || this.isAdmin()
  isAutor = () => this.roles?.includes(Role.Autor) || this.isAdmin()
  isGameInFavorite = (gameId: number) => this.favoriteGames?.some((game) => game.id === gameId)
}
