import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { RouterModule } from '@angular/router';
import { YouTubeUrlPipe } from '../pipe/youtube-url.pipe';
import { PosterUrlPipe } from '../pipe/poster-url.pipe';


@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailsComponent,
    YouTubeUrlPipe,
    PosterUrlPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'movies/:list/:query', component: MovieListComponent },
      {path: 'movies/:list', component: MovieListComponent },
      {path: 'movie/:id', component: MovieDetailsComponent }
    ])
  ],
  exports: [
    MovieListComponent
  ]
})
export class MoviesModule { }
