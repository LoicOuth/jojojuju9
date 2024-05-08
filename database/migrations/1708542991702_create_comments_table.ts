import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'comments'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary()
      table.string('content')
      table.integer('user_id').unsigned().references('users.id')
      table.integer('game_id').nullable().unsigned().references('games.id')
      table.integer('software_id').nullable().unsigned().references('softwares.id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
