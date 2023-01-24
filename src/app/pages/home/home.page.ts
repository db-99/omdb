import { Component, OnInit } from '@angular/core';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title: string = '';
  history = ["1", "2", "3", "4", "5"];

  constructor(private storageService: StorageService) {
    this.storageService.getData('searches').then(searches => {
      if (!searches) {
        searches = [];
      }
      this.history = searches;
    });
  }

  ngOnInit() {
  }

  onSearchChange(e:any)
  {
    this.title = e.detail.value;
  }

  // udelat routing pres funkci co se spusti po zmacknuti tlacitka, pred routingem ulozit do storage
  async setHome() {
    //if (this.history.length == 5)
      // posunout vse o 1, na konec pridat posledni search
    await this.storageService.saveData('searches', this.history);
  }

}
