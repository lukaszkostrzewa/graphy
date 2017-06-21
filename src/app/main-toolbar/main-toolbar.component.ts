import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.css']
})
export class MainToolbarComponent {

  @Output() navToggle = new EventEmitter<boolean>();

  openSideNav() {
    this.navToggle.emit(true);
  }
}
