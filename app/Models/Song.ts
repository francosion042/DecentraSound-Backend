import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
