import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  searchResults = [];
  currentPage = 1;
  title = 'jurassic';

  constructor(private movieService: MovieService, private loadingCtrl: LoadingController) { }

  ngOnInit() {
    this.loadMovies();
  }

  async loadMovies()
  {
    const loading = await this.loadingCtrl.create({
      message: 'Searching...',
      spinner: 'bubbles',
    });
    await loading.present();
    /*this.movieService.getMovieDetails().subscribe((res) => {
      console.log(res);
    });*/
    this.movieService.searchMovies(this.title, this.currentPage).subscribe((res) => {
      loading.dismiss();  // po nacteni odebrat nacitaci obrazovku
      //console.log(res.totalResults);  // interfacem se tohle umoznilo
      console.log(res);
    });
  }

}
