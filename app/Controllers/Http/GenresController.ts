import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Genre from 'App/Models/Genre'

export default class GenresController {
  public async index({}: HttpContextContract) {
    const genres = await Genre.query()

    return {
      status: 200,
      data: genres,
    }
  }

  // public async store({ request }: HttpContextContract) {}

  // public async show({ params }: HttpContextContract) {}

  // public async update({ request, params }: HttpContextContract) {}

  public async destroy({ params }: HttpContextContract) {
    const genreId: number = params.id

    await (await Genre.findByOrFail('id', genreId)).delete()
  }
}
