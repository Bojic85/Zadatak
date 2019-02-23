import { Component, OnInit } from '@angular/core';
import { IMovieList } from './movie-list.interface';
import { TheMovieDbService } from '../the-movie-db.service';
import { IMovieData } from './movie-data.interface';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  pageTitle = 'The most popular movies';
  movies: IMovieData[];
  errorMessage = '';

  private posterUrlPreffix = 'http://image.tmdb.org/t/p/w500';

  constructor(private theMovieDbService: TheMovieDbService) { }

  ngOnInit(): void {
    this.theMovieDbService.getMovieList().subscribe(
      movieList => {
            movieList.results.forEach(movie =>{
              if (movie.poster_path !== null) {
                movie.poster_path = this.posterUrlPreffix + movie.poster_path;
              }
            });
            this.movies = movieList.results;
        },
        error => this.errorMessage = error as any
    );


  }
}
