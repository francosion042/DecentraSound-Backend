import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Artist from './Artist'
import Genre from './Genre'
import Song from './Song'

export default class Album extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public name: string

  @column()
  public description: string

  @column()
  public contractAddress: string

  @column()
  public blockchain: string

  @column()
  public contractType: string // [ERC721, ERC1155]

  @column()
  public totalSongs: number

  @column()
  public artistId: number

  @column()
  public genreId: number

  @column()
  public marketPlace: string

  @column()
  public openseaIdentifier: string //slug

  @column()
  public raribleIdentifier: string

  @column()
  public coverImageUrl: string

  @column()
  public isSpecial: boolean

  @belongsTo(() => Artist, {
    foreignKey: 'artistId',
  })
  public artist: BelongsTo<typeof Artist>

  @belongsTo(() => Genre, {
    foreignKey: 'genreId',
  })
  public genre: BelongsTo<typeof Genre>

  @hasMany(() => Song, {
    foreignKey: 'albumId',
  })
  public songs: HasMany<typeof Song>

  @column.dateTime({ autoCreate: false })
  public releaseDate: DateTime

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
