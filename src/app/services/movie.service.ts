import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// hodit odpoved do json2ts.com
export interface Search {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface SearchResult {
  Search: Search[];
  totalResults: string;
  Response: string;
}

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovieDetails(id: string)
  {
    return this.http.get(`${environment.baseUrl}?apikey=${environment.apiKey}&i=${id}`); // pravy alt+ý
  }

  searchMovies(title = 'jurassic', page = 1): Observable<SearchResult>
  {
    return this.http.get<SearchResult>(`${environment.baseUrl}?apikey=${environment.apiKey}&s=${title}&page=${page}`);
  }
}
