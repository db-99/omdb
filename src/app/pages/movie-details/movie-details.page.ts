import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
})
export class MovieDetailsPage implements OnInit {
  movie:any = null; // movie = null by akceptovalo jenom null, pak misto any predelat na vhodny objekt

  // inject the current activatedroute - we get information about the part after /
  constructor(private route: ActivatedRoute, private movieService: MovieService) { }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id') ?? "";  // nejaka fixni hodnota kdyby to bylo null, jinak error
    console.log(id);
    this.movieService.getMovieDetails(id).subscribe(res => {
      console.log(res);
      this.movie = res;
    })
  }

  // moc nefunguje na mobilu, nativni veci pres capacitor
  /*openWebsite()
  {
    window.open(this.movie.Website);
  }*/

}
