import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TrendingAlbum from 'App/Models/TrendingAlbum'
import { Store } from 'App/Validators/trendingAlbum'

export default class TrendingAlbumsController {
  public async index({ request }: HttpContextContract) {
    const { platform } = request.all()

    let albums

    if (platform) {
      albums = await TrendingAlbum.query().where('platform', platform)
    } else {
      albums = await TrendingAlbum.query()
    }

    return {
      status: 200,
      data: albums,
    }
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(Store)

    const trendingAlbum = await TrendingAlbum.create(payload)

    return { status: 201, data: trendingAlbum }
  }

  // public async show({ params }: HttpContextContract) {}

  // public async update({ request, params }: HttpContextContract) {}

  public async destroy({ params }: HttpContextContract) {
    const trendingAlbumId: number = params.id

    await (await TrendingAlbum.findByOrFail('id', trendingAlbumId)).delete()
  }
}
