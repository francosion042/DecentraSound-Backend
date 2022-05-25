import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne, hasMany, HasMany } from '@ioc:Adonis/Lucid/Orm'
import Artist from './Artist'
import Song from './Song'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public address: string

  @column()
  public email: string

  @column()
  public name: string

  @column()
  public userType: string

  @hasOne(() => Artist, {
    foreignKey: 'userId',
  })
  public artist: HasOne<typeof Artist>

  @hasMany(() => Song, {
    foreignKey: 'userid',
  })
  public likedSongs: HasMany<typeof Song>

  @hasMany(() => Song, {
    foreignKey: 'userid',
  })
  public savedSongs: HasMany<typeof Song>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
