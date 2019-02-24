import { Component } from '@angular/core';
import { MovieListType } from './movies/movie-list/movie-list-type.enum';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular zadatak';
  showType: MovieListType = MovieListType.Popular;

  ShowPopular(): void {
    this.showType = MovieListType.Popular;
  }

  ShowUpcoming(): void {
    this.showType = MovieListType.Upcoming;
  }
}
