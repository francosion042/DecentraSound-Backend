import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TrendingArtists extends BaseSchema {
  protected tableName = 'trendingArtists'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('artistId').unsigned().references('artists.id').onDelete('CASCADE')

      table.string('platform')

      table.integer('position').notNullable()

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
