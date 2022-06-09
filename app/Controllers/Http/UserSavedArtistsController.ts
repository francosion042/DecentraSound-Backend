import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserSavedArtist from 'App/Models/UserSavedArtist'

export default class UserSavedArtistsController {
  public async getUserSavedArtists({ params }: HttpContextContract) {
    const userId: number = params.user_id

    const artists = await UserSavedArtist.query()
      .where('userId', userId)
      .preload('artist', (artist) => {
        artist
          .preload('albums', (album) => {
            album.preload('genre').preload('songs').preload('artist')
          })
          .preload('songs')
      })

    return { status: 200, data: artists }
  }

  public async saveArtist({ params }: HttpContextContract) {
    const userId: number = params.user_id
    const artistId: number = params.artist_id

    await User.findByOrFail('id', userId)

    const savedArtist = await UserSavedArtist.create({ userId, artistId })

    return { status: 200, data: savedArtist }
  }

  public async verifyArtistSave({ params }: HttpContextContract) {
    const userId: number = params.user_id
    const artistId: number = params.artist_id

    await User.findByOrFail('id', userId)

    const savedArtist = await UserSavedArtist.query()
      .where('userId', userId)
      .andWhere('artistId', artistId)
      .first()

    return { status: 200, data: savedArtist ? true : false }
  }

  public async unsaveArtist({ params }: HttpContextContract) {
    const userId: number = params.user_id
    const artistId: number = params.artist_id

    await User.findByOrFail('id', userId)

    await UserSavedArtist.query().where('userId', userId).andWhere('artistId', artistId).delete()

    return { status: 200 }
  }
}
