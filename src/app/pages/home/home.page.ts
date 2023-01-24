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
    this.loadHistory();
  }

  ngOnInit() {
  }

  onSearchChange(e:any)
  {
    this.title = e.detail.value;
  }

  // udelat routing pres funkci co se spusti po zmacknuti tlacitka, pred routingem ulozit do storage (zavolat setHome nebo routing async?)
  navigateSearch()
  {
    this.saveSearch();  // jestli bude fungovat tak pak zkusit takhle, zmenit i v html; ano, funguje
    const params: NavigationExtras = {
      queryParams: { search: this.title },
    };
    this.router.navigate(['/movies'], params);
  }

  async saveSearch() {
    if (this.history.length == 5)
    {
      // posunout vse o 1, na konec pridat posledni search
      this.history.splice(0, 0, this.title);
      this.history.pop();
      console.log("history length == 5");
      console.log(this.history);
    }
    await this.storageService.saveData('searches', this.history);
    this.historySubject.next(this.history);
    console.log(this.history);
    //this.navigateSearch();
  }

  navigateFromHistory(search: string)
  {
    this.title = search;
    console.log(this.title);
    this.navigateSearch();
  }

  ionViewWillEnter()
  {
    this.loadHistory();
  }

  loadHistory()
  {
    this.storageService.getData('searches').then(searches => {
      if (!searches) {
        searches = this.history;
      }
      this.historySubject.next(searches);
      console.log("history: " + this.history);
      console.log("searches: " + searches);
      console.log("history subject: " + this.historySubject);
      this.history = searches;
    });
  }
}
