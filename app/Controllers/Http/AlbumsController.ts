import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Album from 'App/Models/Album'
import OpenSeaAPIService from 'App/Services/OpenSeaAPIService'
import { Store } from 'App/Validators/album'
import { extractOpenSeaAlbum } from 'App/Utils'
import { AlbumPayload } from 'App/Types'
import Artist from 'App/Models/Artist'

export default class AlbumsController {
  public async index({}: HttpContextContract) {
    const albums = await Album.query()

    return {
      status: 200,
      data: albums,
    }
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(Store)
    let album

    if (payload.marketPlace === 'OpenSea') {
      const data = await OpenSeaAPIService.getACollectionBySlug({
        collection_slug: payload.openseaSlug!,
      })

      const albumPayload: AlbumPayload = await extractOpenSeaAlbum(data)
      albumPayload.artistId = payload.artistId

      album = await Album.create(albumPayload)
    }

    const artist = await Artist.findByOrFail('id', payload.artistId)
    artist.imageUrl = album.coverImageUrl
    await artist.save()

    return { status: 201, data: album }
  }

  public async show({ params }: HttpContextContract) {
    const albumId: number = params.id

    const album = await Album.query()
      .where('id', albumId)
      .preload('artist')
      .preload('genre')
      .preload('songs')

    return { status: 200, data: album }
  }

  // public async update({ request, params }: HttpContextContract) {}

  public async destroy({ params }: HttpContextContract) {
    const albumId: number = params.id

    await (await Album.findByOrFail('id', albumId)).delete()
  }
}
