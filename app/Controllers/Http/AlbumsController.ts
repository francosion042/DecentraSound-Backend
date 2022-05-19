import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Album from 'App/Models/Album'
import { Store } from 'App/Validators/album'

export default class AlbumsController {
  public async index({}: HttpContextContract) {
    const albums = await Album.query()

    return {
      status: 200,
      data: albums,
    }
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(Store)
  }

  // public async show({ params }: HttpContextContract) {}

  // public async update({ request, params }: HttpContextContract) {}

  public async destroy({ params }: HttpContextContract) {
    const albumId: number = params.id

    await (await Album.findByOrFail('id', albumId)).delete()
  }
}
