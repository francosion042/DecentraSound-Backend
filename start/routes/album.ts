import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('albums', 'AlbumsController').apiOnly()
}).prefix('api/v1')
