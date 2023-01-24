import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title: string = '';
  history = ["1", "2", "3", "4", "5"];

  constructor(private router:Router, private storageService: StorageService) {
    this.storageService.getData('searches').then(searches => {
      if (!searches) {
        //searches = [];
        console.log("zadny searches");
      }
      console.log("searches existuji");
      console.log(searches);
      this.history = searches;
    });
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
    this.saveSearch();
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
    }
    await this.storageService.saveData('searches', this.history);
  }

}
