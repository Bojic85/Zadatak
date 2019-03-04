import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Angular zadatak';
  listFilter = '';

  constructor(private router: Router) {}

  Search(): void {
    let query = this.listFilter.trim();
    if (query !== '') {
      query = query.replace(/\s+/g, '+');
      this.router.navigateByUrl('movies/search/' + query);
    }
    this.listFilter = '';
  }
}
