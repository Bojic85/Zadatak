import { Component, OnInit, Input } from '@angular/core';
import { TheMovieDbService } from '../the-movie-db.service';
import { IMovieData } from './movie-data.interface';
import { MovieListType } from './movie-list-type.enum';

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
  private showListType: MovieListType = MovieListType.Popular;

  @Input('show')
  set listFilter(value: MovieListType){
      this.showListType = value;
      this.Show();
  }

  constructor(private theMovieDbService: TheMovieDbService) { }

  ngOnInit(): void {
    this.Show();
  }

  public Show(): void {
    this.theMovieDbService.getMovieList(this.showListType).subscribe(
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

    this.pageTitle = `The top ${this.showListType} movies`;
  }
}
