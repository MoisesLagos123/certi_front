import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Movie } from './models/movie.model';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  private apiUrl = 'http://localhost:4000';

  constructor(private http: HttpClient) {}

  getMovies(): Observable<Movie[]> {
    return this.http.get<Movie[]>(`${this.apiUrl}/api/peliculas`);
  }

  getMovieById(movieId: number): Observable<Movie> {
    return this.http.get<Movie>(`${this.apiUrl}/api/peliculas/${movieId}`);
  }
  getMoviesAndRatings(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/api/peliculas`);
  }

}
