import { DateTime } from 'luxon'
import { BaseModel, column, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Artist from './Artist'

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

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
