import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
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
}
