import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RaribleAPIService from 'App/Services/RaribleAPIService'
import { extractRaribleMusicAssets } from 'App/Utils'
import User from 'App/Models/User'
import UserLikedSong from 'App/Models/UserLikedSong'
import UserSavedSong from 'App/Models/UserSavedSong'

export default class UserSongsController {
  public async getUserOwnedSongs({ params }: HttpContextContract) {
    const userId = params.user_id

    const user = await User.findByOrFail('id', userId)

    const assets = await RaribleAPIService.getAssetsByOwner({
      address: user.address,
    })

    const musicAssets = await extractRaribleMusicAssets(assets)

    return { status: 200, data: musicAssets }
  }

  public async getUserLikedSongs({ params }: HttpContextContract) {
    const userId = params.user_id

    const songs = await UserLikedSong.query()
      .where('userId', userId)
      .preload('song', (song) => {
        song.preload('album')
        song.preload('artist')
      })

    return { status: 200, data: songs }
  }

  public async verifySongLike({ params }: HttpContextContract) {
    const userId: number = params.user_id
    const songId = params.song_id

    await User.findByOrFail('id', userId)

    const likedSong = await UserLikedSong.query()
      .where('userId', userId)
      .andWhere('songId', songId)
      .first()

    return { status: 200, data: likedSong ? true : false }
  }

  public async getUserSavedSongs({ params }: HttpContextContract) {
    const userId = params.user_id

    const songs = await UserSavedSong.query()
      .where('userId', userId)
      .preload('song', (song) => {
        song.preload('album')
        song.preload('artist')
      })

    return { status: 200, data: songs }
  }

  public async verifySongSave({ params }: HttpContextContract) {
    const userId: number = params.user_id
    const songId = params.song_id

    await User.findByOrFail('id', userId)

    const savedSong = await UserSavedSong.query()
      .where('userId', userId)
      .andWhere('songId', songId)
      .first()

    return { status: 200, data: savedSong ? true : false }
  }

  public async likeSong({ params }: HttpContextContract) {
    const userId: number = params.user_id
    const songId = params.song_id

    await User.findByOrFail('id', userId)

    const likedSong = await UserLikedSong.create({ userId, songId })

    return { status: 200, data: likedSong }
  }

  public async unlikeSong({ params }: HttpContextContract) {
    const userId: number = params.user_id
    const songId: number = params.song_id

    await User.findByOrFail('id', userId)

    await UserLikedSong.query().where('userId', userId).andWhere('songId', songId).delete()

    return { status: 200 }
  }

  public async saveSong({ params }: HttpContextContract) {
    const userId: number = params.user_id
    const songId = params.song_id

    await User.findByOrFail('id', userId)

    const likedSong = await UserSavedSong.create({ userId, songId })

    return { status: 200, data: likedSong }
  }

  public async unsaveSong({ params }: HttpContextContract) {
    const userId: number = params.user_id
    const songId: number = params.song_id

    await User.findByOrFail('id', userId)

    await UserSavedSong.query().where('userId', userId).andWhere('songId', songId).delete()

    return { status: 200 }
  }
}
