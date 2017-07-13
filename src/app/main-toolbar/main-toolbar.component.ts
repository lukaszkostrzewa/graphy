import {Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MdButtonToggle, MdButtonToggleChange} from '@angular/material';
import {GraphComponent} from '../graph/graph.component';

@Component({
  selector: 'app-main-toolbar',
  templateUrl: './main-toolbar.component.html',
  styleUrls: ['./main-toolbar.component.scss']
})
export class MainToolbarComponent {

  @Output() navToggle = new EventEmitter<boolean>();
  @Input() graphComponent: GraphComponent;
  @ViewChild('editModeToggler') editModeToggler: MdButtonToggle;

  openSideNav() {
    this.navToggle.emit(true);
  }

  editToggleEvent(e: MdButtonToggleChange) {
    this.graphComponent.setEditMode(e.source.checked);
  }

  leaveEditMode() {
    if (this.editModeToggler.checked) {
      this.toggleEditMode();
    }
  }

  toggleEditMode() {
    this.editModeToggler._inputElement.nativeElement.click();
  }
}
