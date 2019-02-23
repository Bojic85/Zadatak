import { IMovieData } from './movie-data.interface';

export interface IMovieList {
    page: number;
    total_results: number;
    total_pages: number;
    results: IMovieData[];
}
