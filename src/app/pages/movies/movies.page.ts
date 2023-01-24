import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InfiniteScrollCustomEvent, IonContent, IonInfiniteScroll, LoadingController } from '@ionic/angular';
import { ReplaySubject } from 'rxjs';
import { MovieService, Search } from 'src/app/services/movie.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.page.html',
  styleUrls: ['./movies.page.scss'],
})
export class MoviesPage implements OnInit {
  movies: Search[] = [];
  currentPage = 1;
  title = 'jurassic';
  @ViewChild(IonContent, { read: IonContent }) content: IonContent;
  @ViewChild(IonInfiniteScroll) infScroll: IonInfiniteScroll;
  history = []; // pouze pro ucely ukladani
  private historySubject = new ReplaySubject<any[]>(1);

  constructor(private movieService: MovieService, private loadingCtrl: LoadingController,
    private router: Router, private route: ActivatedRoute,
    private storageService: StorageService) { 
      // nacteni jenom aby se zaplnilo history tim co je ulozene
      this.storageService.getData('searches').then(searches => {
        if (!searches) {
          searches = this.history;
        }
        this.historySubject.next(searches);
        this.history = searches;
      });
    }

  ngOnInit() {
    this.title = this.route.snapshot.queryParamMap.get('search') ?? "";
    console.log(this.title);
    this.loadMovies();
  }

  loadMovies(loadMore = false, event?: any)
  {
    if (loadMore)
      this.currentPage++;
    if (event)
    {
      event.target.disabled = false;
    }

    this.movieService.getSearchResults(this.title, this.currentPage).subscribe((res) => {
      
      if (res.Response == "True") // kdyz neni response, tak neni ani Search[] nebo totalResults
      {
        if (this.currentPage > 1)
          this.movies.push(...res.Search);
        else
          this.movies = res.Search;
        console.log(res);
      }
      else
      {
        this.movies = [];
      }
      
      if (event)
        event.target.complete();

      if (parseInt(res.totalResults, 10) <= this.currentPage*10)
        this.infScroll.disabled = true;
    });
  }

  onSearchChange(e:any)
  {
    this.content.scrollToTop();
    this.title = e.detail.value;
    this.currentPage = 1;
    this.movieService.getSearchResults(this.title, this.currentPage).subscribe((res) => {
      if (res.Response == "True") // opet potreba osetrit
      {
        this.movies = res.Search;
        console.log(res);
      }
      else
      {
        this.loadMovies();
      }
      this.infScroll.disabled = false;
    });
    this.saveSearch();
  }

  async saveSearch() {
    if (this.history.length == 5)
    {
      // posunout vse o 1, na konec pridat posledni search
      this.history.splice(0, 0, this.title);
      this.history.pop();
      console.log("history length == 5");
    }
    await this.storageService.saveData('searches', this.history);
    this.historySubject.next(this.history);
    console.log(this.history);
  }
}
