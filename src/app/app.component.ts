import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  emptyGraph = false;

  constructor() {
  }

  isEmptyGraph(emptyGraph: boolean) {
    this.emptyGraph = emptyGraph;
  }
}
