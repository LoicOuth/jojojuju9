import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'softwares'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary()
      table.string('name').notNullable().unique()
      table.string('description')
      table.text('content', 'longtext')
      table.string('developer')
      table.string('version')
      table.string('picture')
      table.string('os').nullable()
      table.string('storage').nullable()
      table.integer('user_id').unsigned().references('users.id')

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
