import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'patches'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('program')
      table.string('type')
      table.string('link')
      table.string('youtube').nullable()
      table.boolean('required_utorrent').defaultTo(false)
      table.boolean('required_winrar').defaultTo(false)
      table.boolean('required_daemon').defaultTo(false)
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
