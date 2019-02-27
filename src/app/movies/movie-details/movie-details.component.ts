import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { TheMovieDbService } from '../the-movie-db.service';
import { ICast } from './movie-details.interface';

export interface IProduct {
  productId: number;
  productName: string;
  productCode: string;
  releaseDate: string;
  price: number;
  description: string;
  starRating: number;
  imageUrl: string;
}

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
  title: string;
  overview: string;
  releaseDate: string;
  posterUrl: string;
  genres: string;
  cast: ICast[];

  private posterUrlPreffix = 'http://image.tmdb.org/t/p/w500';

  constructor(private theMovieDbService: TheMovieDbService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.GetMovieDetails(id);
  }

  onBack(): void {
    this.location.back();
  }

  private GetMovieDetails(id: string): void {
    this.theMovieDbService.GetMovieDetails(id).subscribe(
      movieDetails => {
            this.title = movieDetails.title;
            this.releaseDate = movieDetails.release_date;
            this.overview = movieDetails.overview;
            this.genres = movieDetails.genres.map(e => e.name).join(', ');
            if (movieDetails.poster_path !== null) {
              this.posterUrl = this.posterUrlPreffix + movieDetails.poster_path;
            }

            movieDetails.credits.cast.forEach(element => {
              if (element.profile_path !== null) {
                element.profile_path = this.posterUrlPreffix + element.profile_path;
              }
            });
            this.cast = movieDetails.credits.cast;
        }
    );
  }
}
