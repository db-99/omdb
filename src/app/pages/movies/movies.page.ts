import { Component, OnInit } from '@angular/core';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {

  constructor(private movieService: MovieService) { }

  ngOnInit() {
    /*this.movieService.getMovieDetails().subscribe((res) => {
      console.log(res);
    });*/
    this.movieService.searchMovies().subscribe((res) => {
      console.log(res);
    });
  }

}
