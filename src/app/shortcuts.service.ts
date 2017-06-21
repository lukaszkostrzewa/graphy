import {Injectable} from '@angular/core';
import {Hotkey, HotkeysService} from "angular2-hotkeys";
import {MdSnackBar} from "@angular/material";

@Injectable()
export class ShortcutsService {

  constructor(private hotKeysService: HotkeysService, private snackBar: MdSnackBar) {
  }

  initialize() {
    this.getMappings().forEach(
      mapping => this.hotKeysService.add(new Hotkey(mapping.shortcut, mapping.handler)));
  }

  private getMappings() {
    return [
      {shortcut: 'ctrl+l', handler: this.toggleLasso},
      {shortcut: 'ctrl+a', handler: this.selectAllNodes},
      {shortcut: 'ctrl+`', handler: this.toggleMode},
      {shortcut: 'del', handler: this.deleteNode}
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

  private deleteNode = (event: KeyboardEvent): boolean => {
    console.log("Deleting node...");
    this.snackBar
      .open("Node deleted", "Undo", {
        duration: 2000,
      })
      .onAction()
      .subscribe(() => {
        console.log("Undo node deletion");
      });
    return false;
  };
}
