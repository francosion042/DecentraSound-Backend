import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { errorHandler } from 'App/Utils'
import {
  GetAssetsByCollectionRequestBody,
  GetAssetsByOwnerRequestBody,
  GetCollectionByIdRequestBody,
} from 'App/Types/raribleServiceTypes'

export default class RaribleAPIService {
  public static async getAssetsByOwner(data: GetAssetsByOwnerRequestBody) {
    const params = {
      blockchains: data.blockchains,
      owner: `ETHEREUM:${data.address}`,
      size: data.size,
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
      blockchains: data.blockchains,
      collection: `ETHEREUM:${data.address}`,
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
