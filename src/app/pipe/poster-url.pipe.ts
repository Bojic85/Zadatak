import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'poster'
})
export class PosterUrlPipe implements PipeTransform {

  private readonly imageUrl = 'http://image.tmdb.org/t/p/original';

  transform(path: string): string {
    return this.imageUrl + path;
  }
}
