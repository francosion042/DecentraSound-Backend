import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserPlaylist from 'App/Models/UserPlaylist'
import UserPlaylistSong from 'App/Models/UserPlaylistSong'
import { Store, Update } from 'App/Validators/playlist'

export default class UserPlaylistsController {
  public async index({ params }: HttpContextContract) {
    const userId: number = params.user_id

    const playlists = await UserPlaylist.query()
      .where('userId', userId)
      .preload('userPlaylistSongs', (playlistSong) => {
        playlistSong.preload('song', (song) => {
          song.preload('album')
          song.preload('artist')
        })
      })

    return { status: 200, data: playlists }
  }

  public async store({ request, params }: HttpContextContract) {
    const userId: number = params.user_id

    const payload = await request.validate(Store)
    payload['userId'] = userId

    const playlist = await UserPlaylist.create(payload)

    return { status: 201, data: playlist }
  }

  public async show({ params }: HttpContextContract) {
    const playlistId: number = params.id

    const playlist = await UserPlaylist.query()
      .where('id', playlistId)
      .preload('userPlaylistSongs', (playlistSong) => {
        playlistSong.preload('song', (song) => {
          song.preload('album')
          song.preload('artist')
        })
      })
    return { status: 200, data: playlist }
  }

  public async addSongToPlaylist({ params }: HttpContextContract) {
    const playlistId: number = params.playlist_id
    const songId: number = params.song_id

    const playlistSong = await UserPlaylistSong.create({
      userPlaylistId: playlistId,
      songId: songId,
    })

    return { status: 200, data: playlistSong }
  }

  public async removeSongFromPlaylist({ params }: HttpContextContract) {
    const playlistId: number = params.playlist_id
    const songId: number = params.song_id

    await (
      await UserPlaylistSong.query()
        .where('playlistId', playlistId)
        .andWhere('songId', songId)
        .firstOrFail()
    ).delete()

    return { status: 200 }
  }

  public async update({ request, params }: HttpContextContract) {
    const playlistId: number = params.id

    const payload = await request.validate(Update)

    const playlist = await (await UserPlaylist.findByOrFail('id', playlistId)).merge(payload)

    return { status: 200, data: playlist }
  }

  public async destroy({ params }: HttpContextContract) {
    const playlistId: number = params.id

    await (await UserPlaylist.findByOrFail('id', playlistId)).delete()
  }
}
