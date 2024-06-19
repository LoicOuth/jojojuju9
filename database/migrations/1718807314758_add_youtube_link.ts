import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected gameTable = 'games'
  protected softwareTable = 'softwares'

  async up() {
    this.schema.alterTable(this.gameTable, (table) => {
      table.string('youtube').nullable()
    })
    this.schema.alterTable(this.softwareTable, (table) => {
      table.string('youtube').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.gameTable, (table) => {
      table.dropColumn('youtube')
    })
    this.schema.alterTable(this.softwareTable, (table) => {
      table.dropColumn('youtube')
    })
  }
}
