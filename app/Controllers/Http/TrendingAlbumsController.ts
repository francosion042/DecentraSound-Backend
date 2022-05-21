import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TrendingAlbum from 'App/Models/TrendingAlbum'
import { Store, Update } from 'App/Validators/trendingAlbum'

export default class TrendingAlbumsController {
  public async index({ request }: HttpContextContract) {
    const { platform } = request.all()

    let albums

    if (platform) {
      albums = await TrendingAlbum.query()
        .where('platform', platform)
        .preload('album', (album) => {
          album.preload('artist').preload('genre').preload('songs')
        })
    } else {
      albums = await TrendingAlbum.query().preload('album', (album) => {
        album.preload('artist').preload('genre').preload('songs')
      })
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

  // public async show({ params }: HttpContextContract) {
  //   const trendingAlbumId: number = params.id
  // }

  public async update({ request, params }: HttpContextContract) {
    const trendingAlbumId: number = params.id

    const payload = await request.validate(Update)

    const trendingAlbum = await (await TrendingAlbum.findByOrFail('id', trendingAlbumId))
      .merge(payload)
      .save()

    return { status: 200, data: trendingAlbum }
  }

  public async destroy({ params }: HttpContextContract) {
    const trendingAlbumId: number = params.id

    await (await TrendingAlbum.findByOrFail('id', trendingAlbumId)).delete()
  }
}
