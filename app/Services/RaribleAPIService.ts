import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { errorHandler } from 'App/Utils'
import {
  GetAssetsByCollectionRequestBody,
  GetAssetsByOwnerRequestBody,
  GetCollectionByIdRequestBody,
  GetAssetsByTokenIdsRequestBody,
} from 'App/Types/raribleServiceTypes'

export default class RaribleAPIService {
  public static async getAssetsByOwner(data: GetAssetsByOwnerRequestBody) {
    const params = {
      owner: `ETHEREUM:${data.address}`,
    }
    try {
      const response = await axios.get(`${Env.get('RARIBLE_API_BASE_URL')}/items/byOwner`, {
        params,
      })

      if (response.status === 200 && response.data) {
        return response.data
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  public static async getAssetsByCollection(data: GetAssetsByCollectionRequestBody) {
    const params = {
      collection: `${data.blockchain}:${data.address}`,
      ...(data.continuation && { cursor: data.continuation }),
      size: 50,
    }
    try {
      const response = await axios.get(`${Env.get('RARIBLE_API_BASE_URL')}/items/byCollection`, {
        params,
      })

      if (response.status === 200 && response.data) {
        return response.data
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  public static async getAssetsByTokenIds(data: GetAssetsByTokenIdsRequestBody) {
    const tokenIds: string[] = data.tokenIds.map(
      (token) => `${token.tokenBlockchain}:${token.tokenContractAddress}:${token.tokenId}`
    )
    try {
      const response = await axios.post(`${Env.get('RARIBLE_API_BASE_URL')}/items/byIds`, {
        ids: tokenIds,
      })

      if (response.status === 200 && response.data) {
        return response.data
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  public static async getCollectionById(data: GetCollectionByIdRequestBody) {
    try {
      const response = await axios.get(
        `${Env.get('RARIBLE_API_BASE_URL')}/collections/ETHEREUM:${data.address}`
      )

      if (response.status === 200 && response.data) {
        return response.data
      }
    } catch (error) {
      errorHandler(error)
    }
  }
}
