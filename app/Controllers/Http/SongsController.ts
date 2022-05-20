import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Album from 'App/Models/Album'
import Song from 'App/Models/Song'
import OpenSeaAPIService from 'App/Services/OpenSeaAPIService'
import { Store } from 'App/Validators/song'

export default class SongsController {
  public async index({}: HttpContextContract) {
    const songs = await Song.query()

    return {
      status: 200,
      data: songs,
    }
  }

  public async store({ request, params }: HttpContextContract) {
    const albumId: number = params.album_id
    const { maxNumberToAdd } = request.all()

    await request.validate(Store)

    const album = await Album.findByOrFail('id', albumId)

    /**
     * @dev handle opensea assets, this performs recursion to get all pages of the assets
     */
    if (album.marketPlace === 'OpenSea') {
      const assets: object[] = []

      const handleRecursiveCall = async (params) => {
        const data = await OpenSeaAPIService.getAssetsByCollection(params)

        if (data.assets) {
          assets.push(...data.assets)
        }

        if (maxNumberToAdd && data.next && assets.length + 50 <= maxNumberToAdd) {
          await handleRecursiveCall({
            collection_slug: album.openseaIdentifier,
            asset_contract_address: album.contractAddress,
            cursor: data.next,
          })
        } else if (maxNumberToAdd === undefined && data.next) {
          await handleRecursiveCall({
            collection_slug: album.openseaIdentifier,
            asset_contract_address: album.contractAddress,
            cursor: data.next,
          })
        }
      }

      await handleRecursiveCall({
        collection_slug: album.openseaIdentifier,
        asset_contract_address: album.contractAddress,
      })

      return { count: assets.length, data: assets }
    }
  }

  // public async show({ params }: HttpContextContract) {}

  // public async update({ request, params }: HttpContextContract) {}

  public async destroy({ params }: HttpContextContract) {
    const songId: number = params.id

    await (await Song.findByOrFail('id', songId)).delete()
  }
}
