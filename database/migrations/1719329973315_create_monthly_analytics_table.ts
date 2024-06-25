import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'monthly_analytics'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('month')
      table.integer('year')
      table.integer('visit')
      table.timestamp('created_at')
      table.timestamp('updated_at')

      table.unique(['month', 'year'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
