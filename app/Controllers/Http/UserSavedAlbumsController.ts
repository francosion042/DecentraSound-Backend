import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserSavedAlbum from 'App/Models/UserSavedAlbum'

export default class UserSavedAlbumsController {
  public async getUserSavedAlbums({ params }: HttpContextContract) {
    const userId: number = params.user_id

    const albums = await UserSavedAlbum.query()
      .where('userId', userId)
      .preload('album', (album) => {
        album.preload('artist').preload('genre').preload('songs')
      })

    return { status: 200, data: albums }
  }

  public async saveAlbum({ params }: HttpContextContract) {
    const userId: number = params.user_id
    const albumId: number = params.album_id

    await User.findByOrFail('id', userId)

    const savedAlbum = await UserSavedAlbum.create({ userId, albumId })

    return { status: 200, data: savedAlbum }
  }

  public async verifyAlbumSave({ params }: HttpContextContract) {
    const userId: number = params.user_id
    const albumId: number = params.album_id

    await User.findByOrFail('id', userId)

    const savedAlbum = await UserSavedAlbum.query()
      .where('userId', userId)
      .andWhere('albumId', albumId)
      .first()

    return { status: 200, data: savedAlbum ? true : false }
  }

  public async unsaveAlbum({ params }: HttpContextContract) {
    const userId: number = params.user_id
    const albumId: number = params.album_id

    await User.findByOrFail('id', userId)

    await UserSavedAlbum.query().where('userId', userId).andWhere('albumId', albumId).delete()

    return { status: 200 }
  }
}
