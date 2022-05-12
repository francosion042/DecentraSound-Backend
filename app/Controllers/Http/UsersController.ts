import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RaribleAPIService from 'App/Services/RaribleAPIService'
import { extractRaribleMusicAssets } from 'App/Utils'

export default class UsersController {
  public async me({ request }: HttpContextContract) {
    const { address } = request.all()
    const data = await RaribleAPIService.getAssetsByOwner({
      address: address,
    })

    const musicAssets = await extractRaribleMusicAssets(data)

    return musicAssets
  }
}
