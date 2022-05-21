import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class TrendingArtists extends BaseSchema {
  protected tableName = 'trending_artists'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('artistId').unsigned().references('artists.id').onDelete('CASCADE')

      table.string('platform')

      table.integer('position').notNullable()

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
