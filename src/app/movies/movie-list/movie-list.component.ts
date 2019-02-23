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
  movieList: IMovieList;
  movies: IMovieData[];
  errorMessage = '';

  constructor(private theMovieDbService: TheMovieDbService) { }

  ngOnInit(): void {
    this.theMovieDbService.getMovieList().subscribe(
      movieList => {
            this.movieList = movieList;
            this.movies = movieList.results;
        },
        error => this.errorMessage = error as any
    );
  }
}
