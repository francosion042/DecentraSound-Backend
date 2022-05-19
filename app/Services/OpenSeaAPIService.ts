import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { errorHandler } from 'App/utils'
import {
  GetAssetsByCollectionRequestBody,
  GetACollectionRequestBody,
} from 'App/Types/openSeaServiceTypes'

export default class OpenSeaAPIService {
  public static async getAssetsByCollection(data: GetAssetsByCollectionRequestBody) {
    const params = {
      collection_slug: data.collection_slug,
      asset_contract_address: data.asset_contract_address,
      limit: 50,
      include_orders: false,
      cursor: data.cursor,
    }
    try {
      const response = await axios.get(`${Env.get('OPENSEA_API_BASE_URL')}/assets`, {
        params,
        headers: { 'X-API-KEY': Env.get('OPENSEA_API_KEY') },
      })

      if (response.status === 200 && response.data) {
        return response.data
      }
      return response.data
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
      return response.data
    } catch (error) {
      errorHandler(error)
    }
  }
}
