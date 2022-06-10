import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Artist from 'App/Models/Artist'
import { Store } from 'App/Validators/artist'

export default class ArtistsController {
  public async index({}: HttpContextContract) {
    const artists = await Artist.query()
      .preload('albums', (album) => {
        album.preload('genre').preload('songs').preload('artist')
      })
      .preload('songs')

    return {
      status: 200,
      data: artists,
    }
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(Store)

    const artist = await Artist.create(payload)

    return { status: 201, data: artist }
  }

  public async show({ params }: HttpContextContract) {
    const artistId: number = params.id

    const artist = await Artist.query()
      .where('id', artistId)
      .preload('albums', (album) => {
        album.preload('genre').preload('songs').preload('artist')
      })
      .preload('songs')

    return { status: 200, data: artist }
  }

  // public async update({ request, params }: HttpContextContract) {}

  public async destroy({ params }: HttpContextContract) {
    const artistId: number = params.id

    await (await Artist.findByOrFail('id', artistId)).delete()
  }
}
