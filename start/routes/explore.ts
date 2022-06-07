import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.get('albums/special/all', 'ExploresController.getSpecialAlbums')

  Route.get('albums/special/byGenre', 'ExploresController.getSpecialAlbumsByGenre')

  Route.get('albums/latest', 'ExploresController.getLatestAlbums')

  Route.get('albums/byBockchain', 'ExploresController.getAlbumsByBlockchain')
}).prefix('api/v1/explore')
