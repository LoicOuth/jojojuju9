import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected gameTable = 'games'
  protected softwareTable = 'softwares'

  async up() {
    this.schema.alterTable(this.gameTable, (table) => {
      table.string('editor').nullable()
    })
    this.schema.alterTable(this.softwareTable, (table) => {
      table.string('editor').nullable()
    })
  }

  async down() {
    this.schema.alterTable(this.gameTable, (table) => {
      table.dropColumn('editor')
    })
    this.schema.alterTable(this.softwareTable, (table) => {
      table.dropColumn('editor')
    })
  }
}
