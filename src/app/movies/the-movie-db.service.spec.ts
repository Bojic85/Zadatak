import { TestBed } from '@angular/core/testing';

import { TheMovieDbService } from './the-movie-db.service';

describe('TheMovieDbService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TheMovieDbService = TestBed.get(TheMovieDbService);
    expect(service).toBeTruthy();
  });
});
