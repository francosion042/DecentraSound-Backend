import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('users/:user_id/songs/owned', 'UserSongsController.getUserOwnedSongs')
}).prefix('api/v1')

// User Liked Songs
Route.group(() => {
  Route.get('users/:user_id/songs/liked', 'UserSongsController.getUserLikedSongs')

  Route.get('users/:user_id/songs/:song_id/liked/verify', 'UserSongsController.verifySongLike')

  Route.post('users/:user_id/songs/:song_id/like', 'UserSongsController.likeSong')

  Route.post('users/:user_id/songs/:song_id/unlike', 'UserSongsController.unlikeSong')
}).prefix('api/v1')

// user Saved Songs
Route.group(() => {
  Route.get('users/:user_id/songs/saved', 'UserSongsController.getUserSavedSongs')

  Route.get('users/:user_id/songs/:song_id/saved/verify', 'UserSongsController.verifySongSave')

  Route.post('users/:user_id/songs/:song_id/save', 'UserSongsController.saveSong')

  Route.post('users/:user_id/songs/:song_id/unsave', 'UserSongsController.unsaveSong')
}).prefix('api/v1')

// Playlist
Route.group(() => {
  Route.resource('users.playlists', 'UserPlaylistsController').apiOnly()

  Route.post(
    'playlists/:playlist_id/songs/:song_id/add',
    'UserPlaylistsController.addSongToPlaylist'
  )

  Route.delete(
    'playlists/:playlist_id/songs/:song_id/remove',
    'UserPlaylistsController.removeSongFromPlaylist'
  )
}).prefix('api/v1')
