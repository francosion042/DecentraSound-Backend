import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Genre from './Genre'
import Artist from './Artist'
import { CollectionSubmissionToken } from 'App/Types'

export default class ArtistCollectionSubmission extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public artistId: number

  @column()
  public genreId: number

  @column()
  public marketPlace: string

  @column()
  public blockchain: string

  @column()
  public contractType: string

  @column()
  public contractAddress: string

  @column()
  public openseaSlug: string

  @column()
  public marketPlaceCollectionUrl: string

  @column()
  public numOfTokensToUpload: number

  @column({
    prepare: (tokensToUpload) => (tokensToUpload ? JSON.stringify(tokensToUpload) : tokensToUpload),
  })
  public tokensToUpload: CollectionSubmissionToken[]

  @column()
  public isApproved: boolean

  @column()
  public approvalStatus: string

  @belongsTo(() => Artist, {
    foreignKey: 'artistId',
  })
  public artist: BelongsTo<typeof Artist>

  @belongsTo(() => Genre, {
    foreignKey: 'genreId',
  })
  public genre: BelongsTo<typeof Genre>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
