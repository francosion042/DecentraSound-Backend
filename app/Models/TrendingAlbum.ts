import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import Album from './Album'

export default class TrendingAlbum extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public albumId: number

  @column()
  public platform: string

  @column()
  public priority: number

  @belongsTo(() => Album, {
    foreignKey: 'albumId',
  })
  public album: BelongsTo<typeof Album>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
