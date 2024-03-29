import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserSavedSongs extends BaseSchema {
  protected tableName = 'userSavedSongs'

  public async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.integer('userId').unsigned().references('users.id').onDelete('CASCADE').notNullable()

      table.integer('songId').unsigned().references('songs.id').onDelete('CASCADE').notNullable()

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
