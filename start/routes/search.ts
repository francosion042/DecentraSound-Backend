import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('search', 'SearchesController.index')
}).prefix('api/v1')
