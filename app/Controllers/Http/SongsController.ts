import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Album from 'App/Models/Album'
import Song from 'App/Models/Song'
import OpenSeaAPIService from 'App/Services/OpenSeaAPIService'
import { Store } from 'App/Validators/song'
import { extractOpenSeaMusicAssets, extractRaribleMusicAssets } from 'App/Utils'
import RaribleAPIService from 'App/Services/RaribleAPIService'

export default class SongsController {
  public async index({ params }: HttpContextContract) {
    const albumId: number = params.album_id

    const songs = await Song.query().where('albumId', albumId)

    return {
      status: 200,
      data: songs,
    }
  }

  public async store({ request, params }: HttpContextContract) {
    const albumId: number = params.album_id
    const { maxNumberToAdd } = request.all()

    const requestBody = await request.validate(Store)

    const album = await Album.findByOrFail('id', albumId)

    let songPayload

    /**
     * @dev handle opensea assets, this performs recursion to get all pages of the assets
     */
    if (album.marketPlace === 'OpenSea') {
      const assets: object[] = []

      if (!requestBody.tokenIds) {
        const handleRecursiveCall = async (params) => {
          const data = await OpenSeaAPIService.getAssetsByCollection(params)

          if (data.assets) {
            assets.push(...data.assets)
          }

          // prevent exceeding the max number of songs to add
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
      } else {
        const data = await OpenSeaAPIService.getAssetsByTokenIds({
          tokenIds: requestBody.tokenIds,
        })

        if (data.assets) {
          assets.push(...data.assets)
        }
      }

      songPayload = await extractOpenSeaMusicAssets(assets, albumId, album.artistId)
    } else if (album.marketPlace === 'Rarible') {
      /**
       * @dev handle rarible assets, this performs recursion to get all pages of the assets
       */
      const assets: object[] = []

      if (!requestBody.tokenIds) {
        const handleRecursiveCall = async (params) => {
          const data = await RaribleAPIService.getAssetsByCollection(params)

          if (data.items) {
            assets.push(...data.items)
          }

          // prevent exceeding the max number of songs to add
          if (maxNumberToAdd && data.continuation && assets.length + 50 <= maxNumberToAdd) {
            await handleRecursiveCall({
              blockchain: album.blockchain,
              address: album.contractAddress,
              continuation: data.continuation,
            })
          } else if (maxNumberToAdd === undefined && data.continuation) {
            await handleRecursiveCall({
              blockchain: album.blockchain,
              address: album.contractAddress,
              continuation: data.continuation,
            })
          }
        }

        await handleRecursiveCall({
          blockchain: album.blockchain,
          address: album.contractAddress,
        })
      } else {
        const data = await RaribleAPIService.getAssetsByTokenIds({
          tokenIds: requestBody.tokenIds,
        })

        if (data.items) {
          assets.push(...data.items)
        }
      }

      songPayload = await extractRaribleMusicAssets(assets, albumId, album.artistId)
    }

    const songs = await Song.updateOrCreateMany('tokenId', songPayload)

    return { status: 201, data: songs }
  }

  // public async show({ params }: HttpContextContract) {}

  // public async update({ request, params }: HttpContextContract) {}

  public async destroy({ params }: HttpContextContract) {
    const songId: number = params.id

    await (await Song.findByOrFail('id', songId)).delete()
  }
}
