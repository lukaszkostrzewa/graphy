import {Component, EventEmitter, Output} from "@angular/core";
import {MdButtonToggleChange} from "@angular/material";

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent {

  @Output() navToggle = new EventEmitter<boolean>();
  @Output() editToggle = new EventEmitter<boolean>();

  openSideNav() {
    this.navToggle.emit(true);
  }

  editToggleEvent(e: MdButtonToggleChange) {
    this.editToggle.emit(e.source.checked);
  }
}
