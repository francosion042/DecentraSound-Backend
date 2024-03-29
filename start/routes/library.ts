import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('users/:user_id/songs/owned', 'UserSongsController.getUserOwnedSongs')
}).prefix('api/v1/library')

// User Liked Songs
Route.group(() => {
  Route.get('users/:user_id/songs/liked', 'UserSongsController.getUserLikedSongs')

  Route.get('users/:user_id/songs/:song_id/liked/verify', 'UserSongsController.verifySongLike')

  Route.post('users/:user_id/songs/:song_id/like', 'UserSongsController.likeSong')

  Route.delete('users/:user_id/songs/:song_id/unlike', 'UserSongsController.unlikeSong')
}).prefix('api/v1/library')

// user Saved Songs
Route.group(() => {
  Route.get('users/:user_id/songs/saved', 'UserSongsController.getUserSavedSongs')

  Route.get('users/:user_id/songs/:song_id/saved/verify', 'UserSongsController.verifySongSave')

  Route.post('users/:user_id/songs/:song_id/save', 'UserSongsController.saveSong')

  Route.delete('users/:user_id/songs/:song_id/unsave', 'UserSongsController.unsaveSong')
}).prefix('api/v1/library')

// user saved albums
Route.group(() => {
  Route.get('users/:user_id/albums/saved', 'UserSavedAlbumsController.getUserSavedAlbums')

  Route.get(
    'users/:user_id/albums/:album_id/saved/verify',
    'UserSavedAlbumsController.verifyAlbumSave'
  )

  Route.post('users/:user_id/albums/:album_id/save', 'UserSavedAlbumsController.saveAlbum')

  Route.delete('users/:user_id/albums/:album_id/unsave', 'UserSavedAlbumsController.unsaveAlbum')
}).prefix('api/v1/library')

// user saved artists
Route.group(() => {
  Route.get('users/:user_id/artists/saved', 'UserSavedArtistsController.getUserSavedArtists')

  Route.get(
    'users/:user_id/artists/:artist_id/saved/verify',
    'UserSavedArtistsController.verifyArtistSave'
  )

  Route.post('users/:user_id/artists/:artist_id/save', 'UserSavedArtistsController.saveArtist')

  Route.delete(
    'users/:user_id/artists/:artist_id/unsave',
    'UserSavedArtistsController.unsaveArtist'
  )
}).prefix('api/v1/library')

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
}).prefix('api/v1/library')
