import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-locate-button',
  templateUrl: './locate-button.component.html',
  styleUrls: ['./locate-button.component.scss']
})
export class LocateButtonComponent {

  @Output() click = new EventEmitter<any>();
}
