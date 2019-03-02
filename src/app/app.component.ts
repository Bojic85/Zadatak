import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { stringify } from 'querystring';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular zadatak';
  listFilter = '';
  url = 'https://www.youtube.com/embed/g4Hbz2jLxvQ';

  constructor(private router: Router) {}

  Search(): void {
    let query = this.listFilter.trim();
    if (query !== '') {
      query = query.replace(/\s+/g, '+');
      console.log(query);
      this.router.navigateByUrl('movies/search/' + query);
    }
    this.listFilter = '';
  }
}
