import { Component, OnInit} from '@angular/core';
import { TheMovieDbService } from '../the-movie-db.service';
import { IMovieData } from './movie-data.interface';
import { ActivatedRoute } from '@angular/router';
import { IMovieList } from './movie-list.interface';

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
      if (params.list === 'search') {
        this.SearchMovies(params.query);
        this.pageTitle = `Movie search: ${params.query}`;
      } else {
        this.GetMoviesData(params.list);
        this.pageTitle = `The top ${params.list} movies`;
      }
    });
  }

  private GetMoviesData(listType: string): void {
    this.theMovieDbService.GetMovieList(listType).subscribe(
      movieList => {
          this.GetMovies(movieList);
        },
        error => this.errorMessage = error as any
    );
  }

  private SearchMovies(query: string): void {
    this.theMovieDbService.MultiSearch(query).subscribe(
      movieList => {
            this.GetMovies(movieList);
        },
        error => this.errorMessage = error as any
    );
  }

  private GetMovies(movieList: IMovieList) {
    movieList.results.forEach(movie => {
      if (movie.poster_path !== null) {
        movie.poster_path = this.posterUrlPreffix + movie.poster_path;
      }
    });
    this.movies = movieList.results;
  }
}
