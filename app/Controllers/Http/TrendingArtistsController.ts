import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import TrendingArtist from 'App/Models/TrendingArtist'
import { Store, Update } from 'App/Validators/trendingArtist'

export default class TrendingArtistsController {
  public async index({ request }: HttpContextContract) {
    const { platform } = request.all()

    let artists

    if (platform) {
      artists = await TrendingArtist.query()
        .where('platform', platform)
        .preload('artist', (artist) => {
          artist.preload('albums').preload('songs')
        })
        .orderBy('position', 'asc')
    } else {
      artists = await TrendingArtist.query()
        .preload('artist', (artist) => {
          artist.preload('albums').preload('songs')
        })
        .orderBy('position', 'asc')
    }

    return {
      status: 200,
      data: artists,
    }
  }

  public async store({ request }: HttpContextContract) {
    const payload = await request.validate(Store)

    const trendingArtist = await TrendingArtist.create(payload)

    return { status: 201, data: trendingArtist }
  }

  // public async show({ params }: HttpContextContract) {}

  public async update({ request, params }: HttpContextContract) {
    const trendingArtistId: number = params.id

    const payload = await request.validate(Update)

    const trendingArtist = await (await TrendingArtist.findByOrFail('id', trendingArtistId))
      .merge(payload)
      .save()

    return { status: 200, data: trendingArtist }
  }

  public async destroy({ params }: HttpContextContract) {
    const trendingArtistId: number = params.id

    await (await TrendingArtist.findByOrFail('id', trendingArtistId)).delete()
  }
}
