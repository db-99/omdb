import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  constructor(private http: HttpClient) { }

  getMovieDetails(): Observable<Object>
  {
    //id = 3896198;
    return this.http.get(`${environment.baseUrl}?i=tt3896198&apikey=${environment.apiKey}`); // pravy alt+ý
  }
}
