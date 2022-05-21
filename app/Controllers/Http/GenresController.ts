import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Genre from 'App/Models/Genre'
import { Store } from 'App/Validators/genre'

export default class GenresController {
  public async index({}: HttpContextContract) {
    const genres = await Genre.query()

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

  // public async update({ request, params }: HttpContextContract) {}

  public async destroy({ params }: HttpContextContract) {
    const genreId: number = params.id

    await (await Genre.findByOrFail('id', genreId)).delete()
  }
}
