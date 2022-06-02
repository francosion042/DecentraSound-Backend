import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Album from 'App/Models/Album'
import Artist from 'App/Models/Artist'
import Song from 'App/Models/Song'

export default class SearchesController {
  public async index({ request }: HttpContextContract) {
    let { term } = request.all()
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
      .preload('albums')
      .preload('songs')
      .limit(5)

    for (let i = 0; i < 5; i++) {
      if (albums[i]) {
        data.push({ resultType: 'album', album: albums[i] })
      }

      if (songs[i]) {
        data.push({ resultType: 'song', song: songs[i] })
      }

      if (artists[i]) {
        data.push({ resultType: 'artist', artist: artists[i] })
      }
    }

    return {
      status: 200,
      data,
    }
  }
}
