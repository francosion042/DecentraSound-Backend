import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import UserPlaylist from 'App/Models/UserPlaylist'
import { Store, Update } from 'App/Validators/playlist'

export default class UserPlaylistsController {
  public async index({ params }: HttpContextContract) {
    const userId: number = params.user_id

    const playlists = await UserPlaylist.query()
      .where('userId', userId)
      .preload('userPlaylistSongs')

    return { status: 200, data: playlists }
  }

  public async store({ request, params }: HttpContextContract) {
    const userId: number = params.user_id

    const payload = await request.validate(Store)
    payload['userId'] = userId

    const playlist = await UserPlaylist.create(payload)

    return { status: 201, data: playlist }
  }

  // public async show({ params }: HttpContextContract) {}

  public async update({ request, params }: HttpContextContract) {
    const playlistId: number = params.id

    const payload = await request.validate(Update)

    const playlist = await (await UserPlaylist.findByOrFail('id', playlistId)).merge(payload)

    return { status: 200, data: playlist }
  }

  public async destroy({ params }: HttpContextContract) {
    const playlistId: number = params.id

    await (await UserPlaylist.findByOrFail('id', playlistId)).delete()
  }
}
