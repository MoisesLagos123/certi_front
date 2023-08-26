import { Component } from '@angular/core';
import { Movie } from '../models/movie.model';
import { MovieService } from '../movie.service';
import { Router ,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent {
  movies: Movie[] = [];
  searchTerm: string = '';
  moviesAndRatings: any[] = [];
  promedioGeneral: number = 0;
  constructor(private movieService: MovieService,  private router: Router,   private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.loadMovies();
    this.getMoviesAndRatings();
  }

  loadMovies() {
    this.movieService.getMovies().subscribe(
      movies => {
        this.movies = movies;
      },
      error => {
        console.error('Error :', error);
      }
    );
  }

  get filteredMovies(): Movie[] {
    return this.movies.filter(movie =>
      movie.titulo.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }


  goToRate(movieId: number) {
    // Redirige a la página de calificación (ajusta la ruta según tu enrutamiento)
    this.router.navigate(['/rate', movieId]);
  }
  getMoviesAndRatings() {
    this.movieService.getMoviesAndRatings().subscribe(
      data => {
        this.moviesAndRatings = data;
        this.calcularPromedios();
      },
      error => {
        console.error('Error al obtener películas y puntuaciones:', error);
      }
    );
  }

  calcularPromedios() {
    let sumaPromediosPonderados = 0;

    for (let i = 0; i < this.moviesAndRatings.length; i++) {
      const movie = this.moviesAndRatings[i];
      let sumaPuntuaciones = 0;

      for (let j = 0; j < movie.puntuaciones.length; j++) {
        sumaPuntuaciones += movie.puntuaciones[j];
      }

      const numeroPuntuaciones = movie.length;
      const promedioPonderado = sumaPuntuaciones / numeroPuntuaciones;

      movie.promedioPonderado = promedioPonderado;
      sumaPromediosPonderados += promedioPonderado;
    }

    this.promedioGeneral = sumaPromediosPonderados / this.moviesAndRatings.length;
  }


}
