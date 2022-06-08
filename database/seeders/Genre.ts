import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Genre from 'App/Models/Genre'
import genres from 'App/data/genres'
export default class GenreSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method

    await Genre.updateOrCreateMany('title', genres)
  }
}
