import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Genre from 'App/Models/Genre'
import { Store, Update } from 'App/Validators/genre'

export default class GenresController {
  public async index({}: HttpContextContract) {
    const genres = await Genre.query().preload('albums', (album) => {
      album.preload('artist')
      album.preload('songs')
    })

    return {
      status: 200,
      data: genres,
    }
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(Store)

    const genre = await Genre.create(payload)

    return { status: 201, data: genre }
  }

  // public async show({ params }: HttpContextContract) {}

  public async update({ request, params }: HttpContextContract) {
    const genreId: number = params.id

    const payload = await request.validate(Update)

    const genre = await (await Genre.findByOrFail('id', genreId)).merge(payload)

    return { status: 200, data: genre }
  }

  public async destroy({ params }: HttpContextContract) {
    const genreId: number = params.id

    await (await Genre.findByOrFail('id', genreId)).delete()
  }
}
