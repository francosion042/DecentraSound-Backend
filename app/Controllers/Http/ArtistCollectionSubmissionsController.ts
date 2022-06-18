import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import ArtistCollectionSubmission from 'App/Models/ArtistCollectionSubmission'
import { Store, Update } from 'App/Validators/artistCollectionSubmission'

export default class ArtistCollectionSubmissionsController {
  public async index({ params }: HttpContextContract) {
    const artistId: number = params.artist_id
    const collectionSubmissions = await ArtistCollectionSubmission.query()
      .where('artistId', artistId)
      .preload('genre')
      .preload('artist')

    return {
      status: 200,
      data: collectionSubmissions,
    }
  }

  public async store({ request, params }: HttpContextContract) {
    const artistId: number = params.artist_id

    const payload = await request.validate(Store)
    payload['artistId'] = artistId

    const collectionSubmission = await ArtistCollectionSubmission.create(payload)

    return { status: 201, data: collectionSubmission }
  }

  // public async show({ params }: HttpContextContract) {}

  public async update({ request, params }: HttpContextContract) {
    const collectionSubmissionId: number = params.id

    const payload = await request.validate(Update)

    const collectionSubmission = await (
      await ArtistCollectionSubmission.findByOrFail('id', collectionSubmissionId)
    ).merge(payload)

    return { status: 200, data: collectionSubmission }
  }

  public async destroy({ params }: HttpContextContract) {
    const collectionSubmissionId: number = params.id

    await (await ArtistCollectionSubmission.findByOrFail('id', collectionSubmissionId)).delete()
  }
}
