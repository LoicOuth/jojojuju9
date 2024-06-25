import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected gameTable = 'games'
  protected softwareTable = 'softwares'

  async up() {
    this.schema.alterTable(this.gameTable, (table) => {
      table.text('notes').nullable()
    })
    this.schema.alterTable(this.softwareTable, (table) => {
      table.text('notes').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.gameTable, (table) => {
      table.dropColumn('notes')
    })
    this.schema.alterTable(this.softwareTable, (table) => {
      table.dropColumn('notes')
    })
  }
}
