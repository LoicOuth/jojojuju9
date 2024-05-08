import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'kind_software'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('software_id').unsigned().references('softwares.id').onDelete('CASCADE')
      table.integer('kind_id').unsigned().references('kinds.id').onDelete('CASCADE')
      table.unique(['software_id', 'kind_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
