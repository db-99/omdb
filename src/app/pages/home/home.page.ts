import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  title: string = '';
  history = ["1", "2", "3", "4", "5"];

  constructor() { }

  ngOnInit() {
  }

  onSearchChange(e:any)
  {
    this.title = e.detail.value;
  }

}
