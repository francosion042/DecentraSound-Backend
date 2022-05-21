import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class Albums extends BaseSchema {
  protected tableName = 'albums'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('artistId').unsigned().references('artists.id').onDelete('CASCADE')

      table.integer('genreId').unsigned().references('genres.id').onDelete('SET NULL')

      table.string('name').notNullable()

      table.text('description')

      table.text('contractAddress')

      table.string('blockchain')

      table.string('contractType') // [ERC721, ERC1155]

      table.string('marketPlace')

      table.text('openseaIdentifier') //slug

      table.text('raribleIdentifier')

      table.text('coverImageUrl')

      table.integer('totalSongs')

      table.timestamp('releaseDate', { useTz: false })

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
