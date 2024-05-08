import { ArraySettingsCode } from '#types/settings'
import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'settings'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id').notNullable().primary()
      table
        .string('code')
        .unique()
        .checkIn(ArraySettingsCode.map((el) => el))
      table.string('name')
      table.text('string_value').nullable()
      table.decimal('decimal_value').nullable()

      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
