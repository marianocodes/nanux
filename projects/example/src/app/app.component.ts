import { Component } from '@angular/core';
import { AppState } from  './state.service'

@Component({
  selector: 'nanux-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public state: AppState) {
    this.state.getMyFavoriteEmojis();
  }

}
