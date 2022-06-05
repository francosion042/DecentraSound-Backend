import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ExploreSections extends BaseSchema {
  protected tableName = 'exploreSections'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('title').notNullable()

      table.string('sectionCard')

      table.boolean('isVisible').defaultTo(true)

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('createdAt', { useTz: true })
      table.timestamp('updatedAt', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
