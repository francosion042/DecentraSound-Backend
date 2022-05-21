import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import RaribleAPIService from 'App/Services/RaribleAPIService'
import { extractRaribleMusicAssets } from 'App/Utils'
import UserValidator from 'App/Validators/user'

export default class UsersController {
  public async store({ request }: HttpContextContract) {
    const { address } = request.body()

    const user = await User.updateOrCreate({ address }, { address })

    return { data: user }
  }

  public async update({ request, params }: HttpContextContract) {
    const userId = params.id

    const payload = await request.validate(UserValidator)

    const user = await (await User.findByOrFail('id', userId)).merge(payload)

    return { data: user }
  }

  public async getUserOwnedSongs({ params }: HttpContextContract) {
    const userId = params.user_id

    const user = await User.findByOrFail('id', userId)

    const assets = await RaribleAPIService.getAssetsByOwner({
      address: user.address,
    })

    const musicAssets = await extractRaribleMusicAssets(assets)

    return { data: musicAssets }
  }
}
