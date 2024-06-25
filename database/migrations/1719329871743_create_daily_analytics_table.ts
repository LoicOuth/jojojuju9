import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'daily_analytics'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('ip').unique()
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
