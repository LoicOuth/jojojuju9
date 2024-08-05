import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected gameTable = 'games'
  protected softwareTable = 'softwares'
  protected questionTable = 'questions'
  protected hackTable = 'hacks'
  protected patchTable = 'patches'

  async up() {
    this.schema.alterTable(this.gameTable, (table) => {
      table.boolean('is_validated').defaultTo(true)
    })
    this.schema.alterTable(this.softwareTable, (table) => {
      table.boolean('is_validated').defaultTo(true)
    })
    this.schema.alterTable(this.questionTable, (table) => {
      table.boolean('is_validated').defaultTo(true)
      table.integer('created_by_id').unsigned().references('users.id')
    })
    this.schema.alterTable(this.hackTable, (table) => {
      table.boolean('is_validated').defaultTo(true)
      table.integer('created_by_id').unsigned().references('users.id')
    })
    this.schema.alterTable(this.patchTable, (table) => {
      table.boolean('is_validated').defaultTo(true)
      table.integer('created_by_id').unsigned().references('users.id')
    })
  }

  async down() {
    this.schema.alterTable(this.gameTable, (table) => {
      table.dropColumn('is_validated')
    })
    this.schema.alterTable(this.softwareTable, (table) => {
      table.dropColumn('is_validated')
    })
    this.schema.alterTable(this.questionTable, (table) => {
      table.dropColumn('is_validated')
      table.dropColumn('created_by_id')
    })
    this.schema.alterTable(this.hackTable, (table) => {
      table.dropColumn('is_validated')
      table.dropColumn('created_by_id')
    })
    this.schema.alterTable(this.patchTable, (table) => {
      table.dropColumn('is_validated')
      table.dropColumn('created_by_id')
    })
  }
}
