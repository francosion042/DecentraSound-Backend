import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { errorHandler } from 'App/Utils'
import {
  GetAssetsByCollectionRequestBody,
  GetACollectionRequestBody,
  GetAssetsByTokenIdsRequestBody,
} from 'App/Types/openSeaServiceTypes'

export default class OpenSeaAPIService {
  public static async getAssetsByCollection(data: GetAssetsByCollectionRequestBody) {
    const params = {
      ...(data.collection_slug && { collection_slug: data.collection_slug }),
      ...(data.asset_contract_address && { asset_contract_address: data.asset_contract_address }),
      ...(data.cursor && { cursor: data.cursor }),
      limit: 50,
      include_orders: false,
    }
    try {
      const response = await axios.get(`${Env.get('OPENSEA_API_BASE_URL')}/assets`, {
        params,
        headers: { 'X-API-KEY': Env.get('OPENSEA_API_KEY') },
      })

      if (response.status === 200 && response.data) {
        return response.data
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  public static async getAssetsByTokenIds(data: GetAssetsByTokenIdsRequestBody) {
    const params = new URLSearchParams()
    params.append('include_orders', 'false')

    for (const tokenId of data.tokenIds!) {
      params.append('token_ids', tokenId.tokenId)
    }

    try {
      const response = await axios.get(`${Env.get('OPENSEA_API_BASE_URL')}/assets`, {
        params,
        headers: { 'X-API-KEY': Env.get('OPENSEA_API_KEY') },
      })

      if (response.status === 200 && response.data) {
        return response.data
      }
    } catch (error) {
      errorHandler(error)
    }
  }

  public static async getACollectionBySlug(data: GetACollectionRequestBody) {
    const slug = data.collection_slug
    try {
      const response = await axios.get(`${Env.get('OPENSEA_API_BASE_URL')}/collection/${slug}`, {
        headers: { 'X-API-KEY': Env.get('OPENSEA_API_KEY') },
      })

      if (response.status === 200 && response.data) {
        return response.data
      }
    } catch (error) {
      errorHandler(error)
    }
  }
}
