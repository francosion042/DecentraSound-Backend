import { DateTime } from 'luxon'
import { BaseModel, column, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Album from './Album'
import ArtistCollectionSubmission from './ArtistCollectionSubmission'

export default class Genre extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public description: string

  @hasMany(() => Album, {
    foreignKey: 'genreId',
  })
  public albums: HasMany<typeof Album>

  @hasMany(() => ArtistCollectionSubmission, {
    foreignKey: 'genreId',
  })
  public collectionSubmissions: HasMany<typeof ArtistCollectionSubmission>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
