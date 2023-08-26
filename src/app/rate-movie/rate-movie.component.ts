import { Component } from '@angular/core';
import { Movie } from '../models/movie.model';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from '../movie.service';

@Component({
  selector: 'app-rate-movie',
  templateUrl: './rate-movie.component.html',
  styleUrls: ['./rate-movie.component.css']
})
export class RateMovieComponent {

  movieId!: number;
  movieDetails!: Movie;

  constructor(private route: ActivatedRoute, private movieService: MovieService) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.movieId = +params['id']; // Obtiene el ID de la película de la URL
      this.loadMovieDetails(); // Carga los detalles de la película
    });
  }


  loadMovieDetails() {
    this.movieService.getMovieById(this.movieId).subscribe(
      movie => {
        this.movieDetails = movie;
      },
      error => {
        console.error('Error fetching movie details:', error);
      }
    );
  }
}
