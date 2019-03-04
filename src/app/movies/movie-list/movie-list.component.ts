import { Component, OnInit, OnDestroy} from '@angular/core';
import { TheMovieDbService } from '../the-movie-db.service';
import { IMovieData } from './movie-data.interface';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.css']
})
export class MovieListComponent implements OnInit, OnDestroy {
  pageTitle = 'The top popular movies';
  movies: IMovieData[];
  errorMessage = '';

  private paramsSubscription: Subscription;
  private routeSubscription: Subscription;

  constructor(private theMovieDbService: TheMovieDbService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.routeSubscription = this.route.params.subscribe(params => {
      if (params.list === 'search') {
        this.SearchMovies(params.query);
        this.pageTitle = `Movie search: ${params.query}`;
      } else {
        this.GetMoviesData(params.list);
        this.pageTitle = `The top ${params.list} movies`;
      }
    });
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
    this.routeSubscription.unsubscribe();
  }

  private GetMoviesData(listType: string): void {
    this.paramsSubscription = this.theMovieDbService.GetMovieList(listType).subscribe(
      movieList => {
          this.movies = movieList.results;
        },
        error => this.errorMessage = error as any
    );
  }

  private SearchMovies(query: string): void {
    this.paramsSubscription = this.theMovieDbService.MultiSearch(query).subscribe(
      movieList => {
          this.movies = movieList.results;
        },
        error => this.errorMessage = error as any
    );
  }
}
