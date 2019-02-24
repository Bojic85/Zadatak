import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovieList } from './movie-list/movie-list.interface';
import { Observable } from 'rxjs';
import { MovieListType } from './movie-list/movie-list-type.enum';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDbService {
  constructor(private http: HttpClient) { }

  getMovieList(showType: MovieListType): Observable<IMovieList> {
    const movieUrl = `https://api.themoviedb.org/3/movie/${showType}?api_key=a00bf2c0862f1b5042df7c4a472075db&language=en-US&page=1`;
    return this.http.get<IMovieList>(movieUrl);
  }
}
