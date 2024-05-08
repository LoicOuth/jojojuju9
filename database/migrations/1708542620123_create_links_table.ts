import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'links'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary()
      table.string('name').nullable()
      table.string('url').notNullable()
      table.boolean('required_utorrent').defaultTo(false)
      table.boolean('required_winrar').defaultTo(false)
      table.boolean('multiplayer').defaultTo(false)
      table.integer('game_id').nullable().unsigned().references('games.id').onDelete('CASCADE')
      table
        .integer('software_id')
        .nullable()
        .unsigned()
        .references('softwares.id')
        .onDelete('CASCADE')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
