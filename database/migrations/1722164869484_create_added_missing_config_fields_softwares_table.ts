import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'softwares'

  async up() {
    this.schema.alterTable(this.tableName, (table) => {
      table.string('memory').nullable()
      table.string('cpu').nullable()
      table.string('gpu').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.tableName, (table) => {
      table.dropColumn('memory')
      table.dropColumn('cpu')
      table.dropColumn('gpu')
    })
  }
}
