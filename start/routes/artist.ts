import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('artists', 'ArtistsController').apiOnly()
}).prefix('api/v1')
