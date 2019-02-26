import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieListComponent } from './movie-list/movie-list.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    MovieListComponent,
    MovieDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: 'movies/:list', component: MovieListComponent },
      {path: 'movie/:id', component: MovieDetailsComponent }
    ])
  ],
  exports: [
    MovieListComponent
  ]
})
export class MoviesModule { }
