import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.resource('users', 'UsersController').apiOnly()

  Route.get('users/:user_id/songs/owned', 'UsersController.getUserOwnedSongs')
}).prefix('api/v1')
