import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Album from 'App/Models/Album'
import Genre from 'App/Models/Genre'

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

  public async getSpecialAlbumsByGenre({}: HttpContextContract) {
    const genreAlbums = await Genre.query().preload('albums', (album) => {
      album.where('isSpecial', true).preload('artist').preload('genre').preload('songs')
    })

    return {
      status: 200,
      data: genreAlbums,
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

  public async getAlbumsByBlockchain({ request, response }: HttpContextContract) {
    let { blockchain } = request.all()

    if (!blockchain) {
      response.status(400)
      return { status: 400 }
    }

    const albums = await Album.query()
      .where('blockchain', blockchain)
      .preload('artist')
      .preload('genre')
      .preload('songs')

    return {
      status: 200,
      data: albums,
    }
  }
}
