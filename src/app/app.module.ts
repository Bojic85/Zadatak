import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { MoviesModule } from './movies/movies.module';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MoviesModule,
    HttpClientModule,
    RouterModule.forRoot([
      {path: '', redirectTo: 'movies/popular', pathMatch: 'full' },
      {path: '**', redirectTo: 'movies/popular', pathMatch: 'full' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
