import {Component} from "@angular/core";
import {ShortcutsService} from "./shortcuts.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [ShortcutsService]
})
export class AppComponent {

  constructor(private shortcutsService: ShortcutsService) {
    shortcutsService.initialize();
  }

  isEmptyGraph(): boolean {
    return true;
  }
}
