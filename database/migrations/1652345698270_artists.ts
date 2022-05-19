import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Artists extends BaseSchema {
  protected tableName = 'artists'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('title').notNullable()

      table.text('description')

      table.integer('userId').unsigned().references('users.id').onDelete('SET NULL')

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
