import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'games'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary()
      table.string('name').notNullable().unique()
      table.string('slug').notNullable().unique()
      table.text('description', 'longtext')
      table.text('content', 'longtext')
      table.string('developer')
      table.string('version').nullable()
      table.string('mode')
      table.boolean('with_dlc').defaultTo(false)
      table.boolean('multiplayer').defaultTo(false)
      table.string('picture')
      table.string('memory')
      table.string('os')
      table.string('cpu')
      table.string('gpu')
      table.string('storage')
      table.integer('user_id').unsigned().references('users.id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
