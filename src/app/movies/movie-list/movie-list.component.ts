import { Component, OnInit, Input } from '@angular/core';
import { TheMovieDbService } from '../the-movie-db.service';
import { IMovieData } from './movie-data.interface';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit {
  pageTitle = 'The top popular movies';
  movies: IMovieData[];
  errorMessage = '';

  private posterUrlPreffix = 'http://image.tmdb.org/t/p/w500';

  constructor(private theMovieDbService: TheMovieDbService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.GetMoviesData(params.list);
      this.pageTitle = `The top ${params.list} movies`;
    });
  }

  private GetMoviesData(listType: string): void {
    this.theMovieDbService.GetMovieList(listType).subscribe(
      movieList => {
            movieList.results.forEach(movie => {
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
