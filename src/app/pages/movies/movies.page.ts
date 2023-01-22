import { Component, OnInit } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { MovieService, Search } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: Search[] = [];  // import search a nahrada movies = []
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
      this.movies = [...this.movies, ...res.Search];  // nefunguje, vyresit
      //console.log(res.totalResults);  // interfacem se tohle umoznilo
      console.log(res);
    });
  }

}
