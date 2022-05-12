import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('users/me', 'UsersController.me')
})
