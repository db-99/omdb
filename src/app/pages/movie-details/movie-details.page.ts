import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {

  // inject the current activatedroute - we get information about the part after /
  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? "";  // nejaka fixni hodnota kdyby to bylo null, jinak error
    console.log(id);
    this.movieService.getMovieDetails(id).subscribe(res => {
      console.log(res);
    })
  }

}
