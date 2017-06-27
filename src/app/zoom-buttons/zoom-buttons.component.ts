import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-zoom-buttons',
  templateUrl: './zoom-buttons.component.html',
  styleUrls: ['./zoom-buttons.component.scss']
})
export class ZoomButtonsComponent {

  @Output() zoomIn = new EventEmitter<any>();
  @Output() zoomOut = new EventEmitter<any>();
}
