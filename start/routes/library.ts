import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('users/:user_id/songs/owned', 'UserSongsController.getUserOwnedSongs')
}).prefix('api/v1')

// User Liked SOngs
Route.group(() => {
  Route.get('users/:user_id/songs/liked', 'UserSongsController.getUserLikedSongs')

  Route.post('users/:user_id/songs/:song_id/like', 'UserSongsController.likeSong')

  Route.post('users/:user_id/songs/:song_id/unlike', 'UserSongsController.unlikeSong')
}).prefix('api/v1')

// user Saved Songs
Route.group(() => {
  Route.get('users/:user_id/songs/saved', 'UserSongsController.getUserSavedSongs')

  Route.post('users/:user_id/songs/:song_id/save', 'UserSongsController.saveSong')

  Route.post('users/:user_id/songs/:song_id/unsave', 'UserSongsController.unsaveSong')
}).prefix('api/v1')

Route.group(() => {
  Route.resource('users.playlists', 'UserPlaylistsController').apiOnly()
}).prefix('api/v1')
