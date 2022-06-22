import Route from '@ioc:Adonis/Core/Route'

Route.group(() => {
  Route.group(() => {
    Route.resource('artists.submissions', 'ArtistCollectionSubmissionsController').apiOnly()
  })
}).prefix('api/v1/artist-dashboard')
