import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Layout} from '../layout/layout';
import {LayoutService} from '../layout/layout.service';

@Component({
  selector: 'app-layout-switch',
  templateUrl: './layout-switch.component.html',
  styleUrls: ['./layout-switch.component.scss'],
  providers: [LayoutService]
})
export class LayoutSwitchComponent implements OnInit {

  @Output() layoutChanged = new EventEmitter<string>();
  layouts: Layout[];

  constructor(private layoutService: LayoutService) {
  }

  ngOnInit(): void {
    this.layouts = this.layoutService.getLayouts();
  }
}
