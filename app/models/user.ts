import { DateTime } from 'luxon'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { BaseModel, column, hasMany, manyToMany } from '@adonisjs/lucid/orm'
import { Role } from '#types/roles'
import Game from '#models/game'
import { type ManyToMany, type HasMany } from '@adonisjs/lucid/types/relations'
import Software from '#models/software'
import Comment from '#models/comment'
import Response from '#models/response'

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
  @hasMany(() => Comment)
  declare comments: HasMany<typeof Comment>
  @hasMany(() => Response)
  declare responses: HasMany<typeof Response>
  @manyToMany(() => Game, { pivotTimestamps: true })
  declare favoriteGames: ManyToMany<typeof Game>
  @manyToMany(() => Software, { pivotTimestamps: true })
  declare favoriteSoftwares: ManyToMany<typeof Software>

  isAdmin = () => this.roles?.includes(Role.Admin)
  isModerator = () => this.roles?.includes(Role.Moderator) || this.isAdmin()
  isAutor = () => this.roles?.includes(Role.Autor) || this.isAdmin()
  isGameInFavorite = (gameId: number) => this.favoriteGames?.some((game) => game.id === gameId)
  isSoftwareInFavorite = (softwareId: number) =>
    this.favoriteSoftwares?.some((software) => software.id === softwareId)
  get isSimpleUser() {
    return !this.isAdmin() && !this.isModerator() && !this.isAutor()
  }
}
