import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IMovieList } from './movie-list/movie-list.interface';
import { Observable } from 'rxjs';
import { IMovieDetails } from './movie-details/movie-details.interface';

@Injectable({
  providedIn: 'root'
})
export class TheMovieDbService {
  constructor(private http: HttpClient) { }

  GetMovieList(listType: string): Observable<IMovieList> {
    const movieUrl = `https://api.themoviedb.org/3/movie/${listType}?api_key=a00bf2c0862f1b5042df7c4a472075db&language=en-US&page=1`;
    return this.http.get<IMovieList>(movieUrl);
  }

  GetMovieDetails(id: string): Observable<IMovieDetails> {
    const movieUrl = `https://api.themoviedb.org/3/movie/${id}?api_key=a00bf2c0862f1b5042df7c4a472075db&language=en-US`;
    return this.http.get<IMovieDetails>(movieUrl);
  }
}
