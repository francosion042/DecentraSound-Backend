import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import User from './User'
import Album from './Album'
import Song from './Song'
import ArtistCollectionSubmission from './ArtistCollectionSubmission'

export default class Artist extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public imageUrl: string

  @column()
  public description: string

  @column()
  public userId: number

  @belongsTo(() => User, {
    foreignKey: 'userId',
  })
  public user: BelongsTo<typeof User>

  @hasMany(() => Album, {
    foreignKey: 'artistId',
  })
  public albums: HasMany<typeof Album>

  @hasMany(() => Song, {
    foreignKey: 'artistId',
  })
  public songs: HasMany<typeof Song>

  @hasMany(() => ArtistCollectionSubmission, {
    foreignKey: 'artistId',
  })
  public collectionSubmissions: HasMany<typeof ArtistCollectionSubmission>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
