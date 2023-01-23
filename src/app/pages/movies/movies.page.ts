import { Component, OnInit } from '@angular/core';
import { InfiniteScrollCustomEvent, IonInfiniteScroll, LoadingController } from '@ionic/angular';
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

  async loadMovies(event?: InfiniteScrollCustomEvent)
  {
    const loading = await this.loadingCtrl.create({
      message: 'Searching...',
      spinner: 'bubbles',
    });
    await loading.present();
    /*this.movieService.getMovieDetails().subscribe((res) => {
      console.log(res);
    });*/
    this.movieService.getSearchResults(this.title, this.currentPage).subscribe((res) => {
      loading.dismiss();  // po nacteni odebrat nacitaci obrazovku
      //this.movies = [...this.movies, ...res.Search];  // nefunguje, vyresit
      this.movies.push(...res.Search);
      //console.log(res.totalResults);  // interfacem se tohle umoznilo
      console.log(res);

      event?.target.complete(); // konec nacitani, zobrazeni dalsich vysledku
      if (event)
      {
        // aby se to nesnazilo nacitat dal i kdyz uz nejsou vysledky
        // wtf? proc to vraci pocet vysledku ve stringu???
        event.target.disabled = parseInt(res.totalResults, 10) <= this.currentPage*10;
      }
    });
  }

  loadMore(event: any)  // pro nekonecne prohlizeni vysledku vyhledavani, ISCE nahrazeno any kvuli erroru
  {
    this.currentPage++;
    this.loadMovies(event);
  }

}
