import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie:any = null;

  // injectovat activatedroute ze kteryho dostanem cast za /
  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    // ziskat id filmu
    const id = this.route.snapshot.paramMap.get('id') ?? "";  // nejaka fixni hodnota kdyby to bylo null, jinak error
    console.log(id);
    // ziskat data o filmu s timhle id
    this.movieService.getMovieDetails(id).subscribe(res => {
      console.log(res);
      this.movie = res;
    })
  }
}
