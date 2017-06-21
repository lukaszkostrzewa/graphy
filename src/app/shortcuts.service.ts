import {Injectable} from '@angular/core';
import {Hotkey, HotkeysService} from "angular2-hotkeys";

@Injectable()
export class ShortcutsService {

  constructor(private hotKeysService: HotkeysService) {
  }

  initialize() {
    this.getMappings().forEach(
      mapping => this.hotKeysService.add(new Hotkey(mapping.shortcut, mapping.handler)));
  }

  private getMappings() {
    return [
      {shortcut: 'ctrl+l', handler: this.toggleLasso},
      {shortcut: 'ctrl+a', handler: this.selectAllNodes},
      {shortcut: 'ctrl+`', handler: this.toggleMode}
    ];
  }

  private toggleLasso = (event: KeyboardEvent): boolean => {
    console.log("Toggle lasso event");
    return false;
  };

  private selectAllNodes = (event: KeyboardEvent): boolean => {
    console.log("Select all nodes event");
    return false;
  };

  private toggleMode = (event: KeyboardEvent): boolean => {
    console.log("Toggle mode event");
    return false;
  };
}
