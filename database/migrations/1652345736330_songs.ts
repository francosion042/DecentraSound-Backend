import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Songs extends BaseSchema {
  protected tableName = 'songs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('artistId').unsigned().references('artists.id').onDelete('CASCADE')

      table.integer('albumId').unsigned().references('albums.id').onDelete('CASCADE')

      table.string('title').notNullable()

      table.string('blockchain')

      table.text('imageUrl')

      table.text('audioUrl').notNullable()

      table.text('contractAddress').notNullable()

      table.text('openseaPermalink')

      table.text('rariblePermalink')

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
