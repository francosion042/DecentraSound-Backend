import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Song from 'App/Models/Song'

export default class SongsController {
  public async index({}: HttpContextContract) {
    const songs = await Song.query()

    return {
      status: 200,
      data: songs,
    }
  }

  // public async store({ request }: HttpContextContract) {}

  // public async show({ params }: HttpContextContract) {}

  // public async update({ request, params }: HttpContextContract) {}

  public async destroy({ params }: HttpContextContract) {
    const songId: number = params.id

    await (await Song.findByOrFail('id', songId)).delete()
  }
}
