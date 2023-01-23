import { Component, OnInit, ViewChild } from '@angular/core';
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

  loadMovies(loadMore = false, event?: any)
  {
    if (loadMore)
      this.currentPage++;

    this.movieService.getSearchResults(this.title, this.currentPage).subscribe((res) => {
      if (this.currentPage > 1)
        this.movies.push(...res.Search);
      else
        this.movies = res.Search;
      console.log(res);

      event?.target.complete();
      if (event)
        event.target.disabled = parseInt(res.totalResults, 10) <= this.currentPage*10;

    });
  }

}
