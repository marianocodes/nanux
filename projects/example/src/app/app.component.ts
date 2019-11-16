import { Component } from '@angular/core';
import { AppService } from  './app.service'

@Component({
  selector: 'nanux-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(public service: AppService) { }

}
