import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('albums.songs', 'SongsController').apiOnly()
}).prefix('api/v1')
