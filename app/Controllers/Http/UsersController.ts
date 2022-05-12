import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import RaribleAPIService from 'App/Services/RaribleAPIService'

export default class UsersController {
  public async me({ request }: HttpContextContract) {
    const { address } = request.all()
    console.log(address)
    const data = await RaribleAPIService.getAssetsByOwner({
      address: address,
    })

    return data
  }
}
