import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TrendingAlbums extends BaseSchema {
  protected tableName = 'trendingAlbums'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('albumId').unsigned().references('albums.id').onDelete('CASCADE').notNullable()

      table.string('platform')

      table.integer('priority').notNullable()

      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down() {
    this.schema.dropTable(this.tableName)
  }
}
