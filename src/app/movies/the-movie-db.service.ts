import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovieList } from './movie-list/movie-list.interface';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDbService {
  private topMovieUrl =
  'https://api.themoviedb.org/3/movie/popular?api_key=a00bf2c0862f1b5042df7c4a472075db&language&language=en-US&page=1';

  constructor(private http: HttpClient) { }

  getMovieList(): Observable<IMovieList> {
    return this.http.get<IMovieList>(this.topMovieUrl);
  }
}
