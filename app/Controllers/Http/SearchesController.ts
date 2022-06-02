import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Album from 'App/Models/Album'
import Artist from 'App/Models/Artist'
import Song from 'App/Models/Song'

export default class SearchesController {
  public async index({ request }: HttpContextContract) {
    let { term } = request.all()
    let dataId = 1
    let data: object[] = []

    term = term.split(' ').join(',')
    const searchTerm: any = term

    const albumSQL = 'to_tsvector(albums.name) || to_tsvector(albums.description) @@ to_tsquery(?)'

    const artistSQL =
      'to_tsvector("artists".name) || to_tsvector(artists.description)  @@ to_tsquery(?)'

    const songSQL = 'to_tsvector("songs".title) @@ to_tsquery(?)'

    const albums = await Album.query()
      .whereRaw(albumSQL, searchTerm?.toLowerCase())
      .preload('artist')
      .preload('songs')
      .limit(5)

    const songs = await Song.query()
      .whereRaw(songSQL, searchTerm?.toLowerCase())
      .preload('artist')
      .preload('album')
      .limit(5)

    const artists = await Artist.query()
      .whereRaw(artistSQL, searchTerm?.toLowerCase())
      .preload('albums', (album) => {
        album.preload('artist').preload('songs').preload('genre')
      })
      .preload('songs')
      .limit(5)

    for (let i = 0; i < 5; i++) {
      if (albums[i]) {
        data.push({ resultType: 'album', dataId, album: albums[i] })
        dataId += 1
      }

      if (songs[i]) {
        data.push({ resultType: 'song', dataId, song: songs[i] })
        dataId += 1
      }

      if (artists[i]) {
        data.push({ resultType: 'artist', dataId, artist: artists[i] })
        dataId += 1
      }
    }

    return {
      status: 200,
      data,
    }
  }
}
