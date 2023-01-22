import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovieDetails(id = 'tt3896198'): Observable<Object>
  {
    return this.http.get(`${environment.baseUrl}?i=${id}&apikey=${environment.apiKey}`); // pravy alt+ý
  }

  searchMovies(title = 'jurassic'): Observable<Object>
  {
    return this.http.get(`${environment.baseUrl}?s=${title}&apikey=${environment.apiKey}`);
  }
}
