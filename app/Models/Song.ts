import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Artist from './Artist'
import Album from './Album'

export default class Song extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public title: string

  @column()
  public tokenId: string

  @column()
  public blockchain: string

  @column()
  public imageUrl: string

  @column()
  public audioUrl: string

  @column()
  public contractAddress: string

  @column()
  public artistId: number

  @column()
  public albumId: number

  @column()
  public openseaPermalink: string

  @column()
  public rariblePermalink: string

  @belongsTo(() => Artist, {
    foreignKey: 'artistId',
  })
  public artist: BelongsTo<typeof Artist>

  @belongsTo(() => Album, {
    foreignKey: 'albumId',
  })
  public album: BelongsTo<typeof Album>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
