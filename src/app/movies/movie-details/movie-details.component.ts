import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Location} from '@angular/common';
import { TheMovieDbService } from '../the-movie-db.service';
import { ICast } from './movie-details.interface';
import { Subscription } from 'rxjs';

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
export class MovieDetailsComponent implements OnInit, OnDestroy {
  title: string;
  overview: string;
  releaseDate: string;
  posterUrl: string;
  genres: string;
  cast: ICast[];
  videoKey: string;

  private posterUrlPreffix = 'http://image.tmdb.org/t/p/w500';
  private paramsSubscription: Subscription;

  constructor(private theMovieDbService: TheMovieDbService,
              private route: ActivatedRoute,
              private location: Location) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    this.GetMovieDetails(id);
  }

  ngOnDestroy() {
    this.paramsSubscription.unsubscribe();
  }

  onBack(): void {
    this.location.back();
  }

  private GetMovieDetails(id: string): void {
    this.paramsSubscription = this.theMovieDbService.GetMovieDetails(id).subscribe(
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

            movieDetails.videos.results.some(video => {
              console.log(video.type + ' ' + video.key);
              if (video.type.toLowerCase() === 'trailer') {
                this.videoKey = video.key;
                return true;
              }
              return false;
            });
        }
    );
  }
}
