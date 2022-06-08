import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserSavedAlbums extends BaseSchema {
  protected tableName = 'userSavedAlbums'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('userId').unsigned().references('users.id').onDelete('CASCADE').notNullable()

      table.integer('albumId').unsigned().references('albums.id').onDelete('CASCADE').notNullable()

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
