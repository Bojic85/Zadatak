import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Pipe({
  name: 'youtube'
})
export class YouTubeUrlPipe implements PipeTransform {

  private readonly youtubeUrl = 'https://www.youtube.com/embed/';

  constructor(private sanitizer: DomSanitizer) {}

  transform(path: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.youtubeUrl + path);
  }
}
