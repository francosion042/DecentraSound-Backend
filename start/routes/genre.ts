import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('genres', 'GenresController').apiOnly()
}).prefix('api/v1')
