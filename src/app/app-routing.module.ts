import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MovieListComponent } from './movie-list/movie-list.component';
import { RateMovieComponent } from './rate-movie/rate-movie.component';

const routes: Routes = [
  { path: 'movies', component: MovieListComponent },
  { path: 'rate/:id', component: RateMovieComponent }, 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
