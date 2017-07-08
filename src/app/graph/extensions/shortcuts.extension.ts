import {GraphComponent} from "../graph.component";
import {Directive, HostListener, Input} from "@angular/core";
import {MainToolbarComponent} from "../../main-toolbar/main-toolbar.component";

@Directive({
  selector: 'app-graph'
})
export class ShortcutsExtension {

  private shortcutsMap = {
    '-': this.zoomOut,
    '=': this.zoomIn,
    'delete': this.deleteSelected,
    'backspace': this.deleteSelected,
    'arrowup': this.moveUp,
    'arrowdown': this.moveDown,
    'arrowleft': this.moveLeft,
    'arrowright': this.moveRight,
    'escape': this.deselectAndLeaveEditMode,
    'ctrl+a': this.selectAllNodes,
    'ctrl+f': this.search,
    'ctrl+s': this.save,
    'ctrl+g': this.groupSelected,
    'ctrl+z': this.undo,
    'ctrl+y': this.redo,
    'ctrl+c': this.copy,
    'ctrl+v': this.paste,
    'ctrl+x': this.cut,
    'ctrl+-': this.zoomOut,
    'ctrl+=': this.zoomIn,
    'ctrl+0': this.locate,
    'ctrl+`': this.toggleMode,
    'ctrl+shift+g': this.ungroupSelected
  };

  @Input() mainToolbar: MainToolbarComponent;

  private static readonly MOVE_BY: number = 20;

  constructor(private graphComponent: GraphComponent) {
  }

  @HostListener('window:keydown', ['$event'])
  keydown(event: KeyboardEvent): boolean {
    let key = [event.ctrlKey && 'ctrl', event.shiftKey && 'shift', event.key.toLowerCase()]
      .filter(Boolean)
      .join('+');
    let handler = this.shortcutsMap[key];
    if (handler) {
      return handler.call(this, event);
    }
    return true;
  }

  private deleteSelected() {
    this.graphComponent.deleteSelectedElements();
    return false;
  };

  private selectAllNodes(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();
    this.graphComponent.selectAll();
    return false;
  };

  private search(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();
    console.log("Search");
    return false;
  };

  private save(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();
    console.log("Save graph");
    return false;
  };

  private groupSelected(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();
    this.graphComponent.groupSelectedNodes();
    return false;
  };

  private ungroupSelected(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();
    this.graphComponent.ungroupSelectedNode();
    return false;
  };

  private undo() {
    this.graphComponent.undo();
    return false;
  };

  private redo() {
    this.graphComponent.redo();
    return false;
  };

  private copy() {
    console.log("Copy");
    return false;
  };

  private paste() {
    console.log("Paste");
    return false;
  };

  private cut() {
    console.log("Cut");
    return false;
  };

  private moveUp() {
    this.graphComponent.moveGraph({x: 0, y: ShortcutsExtension.MOVE_BY});
    return false;
  }

  private moveDown() {
    this.graphComponent.moveGraph({x: 0, y: -ShortcutsExtension.MOVE_BY});
    return false;
  }

  private moveLeft() {
    this.graphComponent.moveGraph({x: ShortcutsExtension.MOVE_BY, y: 0});
    return false;
  }

  private moveRight() {
    this.graphComponent.moveGraph({x: -ShortcutsExtension.MOVE_BY, y: 0});
    return false;
  }

  private zoomIn(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();
    this.graphComponent.zoomIn();
    return false;
  }

  private zoomOut(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();
    this.graphComponent.zoomOut();
    return false;
  }

  private locate() {
    this.graphComponent.locate();
    return false;
  }

  private toggleMode() {
    this.mainToolbar.toggleEditMode();
    return false;
  };

  private deselectAndLeaveEditMode() {
    this.graphComponent.deselect();
    this.mainToolbar.leaveEditMode();
  }
}
