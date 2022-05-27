import { DateTime } from 'luxon'
import { BaseModel, column, belongsTo, BelongsTo } from '@ioc:Adonis/Lucid/Orm'
import UserPlaylist from './UserPlaylist'
import Song from './Song'

export default class PlaylistSong extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public playlistId: number

  @column()
  public songId: number

  @belongsTo(() => UserPlaylist, {
    foreignKey: 'userPlaylistId',
  })
  public userPlaylist: BelongsTo<typeof UserPlaylist>

  @belongsTo(() => Song, {
    foreignKey: 'songId',
  })
  public song: BelongsTo<typeof Song>

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
