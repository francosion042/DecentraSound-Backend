import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Album from 'App/Models/Album'
import OpenSeaAPIService from 'App/Services/OpenSeaAPIService'
import { Store } from 'App/Validators/album'
import { extractOpenSeaAlbum, extractRaribleAlbum } from 'App/Utils'
import { AlbumPayload } from 'App/Types'
import Artist from 'App/Models/Artist'
import RaribleAPIService from 'App/Services/RaribleAPIService'

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
      albumPayload.genreId = payload.genreId
      albumPayload.isSpecial = payload.isSpecial

      album = await Album.updateOrCreate({ openseaIdentifier: payload.openseaSlug }, albumPayload)
    } else if (payload.marketPlace === 'Rarible' && payload.contractAddress && payload.blockchain) {
      const data = await RaribleAPIService.getCollectionById({
        blockchain: payload.blockchain.toUpperCase(),
        address: payload.contractAddress,
      })

      const albumPayload: AlbumPayload = await extractRaribleAlbum(data)
      albumPayload.artistId = payload.artistId
      albumPayload.genreId = payload.genreId
      albumPayload.isSpecial = payload.isSpecial

      album = await Album.updateOrCreate({ contractAddress: payload.contractAddress }, albumPayload)
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

    return { status: 200 }
  }
}
