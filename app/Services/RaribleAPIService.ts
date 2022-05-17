import axios from 'axios'
import Env from '@ioc:Adonis/Core/Env'
import { errorHandler } from 'App/utils'
import { GetAssetsByOwnerRequestBody } from 'App/Types/raribleServiceTypes'

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
      return response.data
    } catch (error) {
      errorHandler(error)
    }
  }
}
