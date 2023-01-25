import { Component, OnInit, ViewChild } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { IonItem } from '@ionic/angular';
import { ReplaySubject } from 'rxjs';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title: string = '';
  history = [];
  private historySubject = new ReplaySubject<any[]>(1);
  @ViewChild(IonItem) historyItem: IonItem;

  constructor(private router:Router, private storageService: StorageService) {
    // na zacatku nacist historii
    this.loadHistory();
  }

  ngOnInit() {
  }

  onSearchChange(e:any)
  {
    // kazdou zmenu textu ulozit do promenne
    this.title = e.detail.value;
    console.log("changed to" + e.detail.value + "result: " + this.title);
  }

  navigateSearch()
  {
    // ulozit a presunout se na stranku s filmama
    this.saveSearch();
    const params: NavigationExtras = {
      queryParams: { search: this.title },  // predat nazev filmu
    };
    this.router.navigate(['/movies'], params);
  }

  async saveSearch() {
    if (this.history.length == 5) // 5 poslednich hledani staci
    {
      // posunout vse o 1, na zacatek pridat posledni search, nejstarsi smazat
      this.history.splice(0, 0, this.title);
      this.history.pop();
      console.log("history length == 5");
      console.log(this.history);
    }
    await this.storageService.saveData('searches', this.history);
    this.historySubject.next(this.history);
    console.log(this.history);
  }

  navigateFromHistory(search: string)
  {
    // predat nazev filmu do promenne, pak klasicky ulozit a prejit
    this.title = search;
    console.log(this.title);
    this.navigateSearch();
  }

  ionViewWillEnter()
  {
    // at se nacte historie i kdyz se da zpet z hledani
    this.loadHistory();
  }

  loadHistory()
  {
    // nacist ze storage do promenne
    this.storageService.getData('searches').then(searches => {
      if (!searches || searches.length == 0) {
        searches = ["1","2","3","4","5"];
      }
      this.historySubject.next(searches);
      console.log("history: " + this.history);
      console.log("searches: " + searches);
      this.history = searches;
    });
  }
}
