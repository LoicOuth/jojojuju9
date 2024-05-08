import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'game_kind'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('game_id').unsigned().references('games.id').onDelete('CASCADE')
      table.integer('kind_id').unsigned().references('kinds.id').onDelete('CASCADE')
      table.unique(['game_id', 'kind_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
