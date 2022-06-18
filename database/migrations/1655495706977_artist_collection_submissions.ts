import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class ArtistCollectionSubmissions extends BaseSchema {
  protected tableName = 'artistCollectionSubmissions'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('artistId').unsigned().references('artists.id').onDelete('CASCADE')

      table.integer('genreId').unsigned().references('genres.id').onDelete('SET NULL')

      table.string('marketPlace')

      table.string('blockchain')

      table.string('contractType') // [ERC721, ERC1155]

      table.text('contractAddress')

      table.string('openseaSlug')

      table.text('marketPlaceCollectionUrl')

      table.integer('numOfTokensToUpload')

      table.jsonb('tokensToUpload')

      table.boolean('isApproved').defaultTo(false)

      table.string('approvalStatus')

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
