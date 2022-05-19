import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Artist from 'App/Models/Artist'

export default class ArtistsController {
  public async index({}: HttpContextContract) {
    const artists = await Artist.query()

    return {
      status: 200,
      data: artists,
    }
  }

  // public async store({ request }: HttpContextContract) {}

  // public async show({ params }: HttpContextContract) {}

  // public async update({ request, params }: HttpContextContract) {}

  public async destroy({ params }: HttpContextContract) {
    const artistId: number = params.id

    await (await Artist.findByOrFail('id', artistId)).delete()
  }
}
