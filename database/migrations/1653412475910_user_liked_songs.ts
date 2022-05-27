import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserLikedSongs extends BaseSchema {
  protected tableName = 'userLikedSongs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('userId').unsigned().references('users.id').onDelete('CASCADE')

      table.integer('songId').unsigned().references('songs.id').onDelete('CASCADE')

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
