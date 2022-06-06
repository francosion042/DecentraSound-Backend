import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Album from 'App/Models/Album'

export default class ExploresController {
  public async getSpecialAlbums({}: HttpContextContract) {
    const albums = await Album.query()
      .where('isSpecial', true)
      .preload('artist')
      .preload('genre')
      .preload('songs')

    return {
      status: 200,
      data: albums,
    }
  }

  public async getSpecialAlbumsByGenre({ params }: HttpContextContract) {
    const genreId: number = params.genre_id

    const albums = await Album.query()
      .where('isSpecial', true)
      .andWhere('genreId', genreId)
      .preload('artist')
      .preload('genre')
      .preload('songs')

    return {
      status: 200,
      data: albums,
    }
  }

  public async getLatestAlbums({}: HttpContextContract) {
    const albums = await Album.query()
      .preload('artist')
      .preload('genre')
      .preload('songs')
      .orderBy('releaseDate', 'desc')

    return {
      status: 200,
      data: albums,
    }
  }
}
