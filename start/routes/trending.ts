import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('trending/albums', 'TrendingAlbumsController').apiOnly()

  Route.resource('trending/artists', 'TrendingArtistsController').apiOnly()
}).prefix('api/v1')
