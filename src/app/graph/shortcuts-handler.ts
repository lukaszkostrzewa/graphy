import {GraphComponent} from "./graph.component";

export class ShortcutsHandler {

  private singleKeyShortcuts = {
    'Delete': this.deleteSelected,
    'ArrowUp': this.moveUp,
    'ArrowDown': this.moveDown,
    'ArrowLeft': this.moveLeft,
    'ArrowRight': this.moveRight,
  };

  private shortcutsWithCtrl = {
    'a': this.selectAllNodes,
    'f': this.search,
    's': this.save,
    'g': this.groupSelected,
    'z': this.undo,
    'y': this.redo,
    'c': this.copy,
    'v': this.paste,
    'x': this.cut,
    '-': this.zoomOut,
    '=': this.zoomIn,
    '0': this.locate,
    '`': this.toggleMode
  };

  private shortcutsWithCtrlAndShift = {
    'G': this.ungroupSelected
  };

  private static readonly MOVE_BY: number = 20;

  constructor(private graphComponent: GraphComponent) {
  }

  keydown(event: KeyboardEvent): boolean {
    let handler = this.singleKeyShortcuts[event.key]
      || (event.ctrlKey && event.shiftKey && this.shortcutsWithCtrlAndShift[event.key])
      || (event.ctrlKey && this.shortcutsWithCtrl[event.key]);
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
    console.log("Group selected");
    return false;
  };

  private ungroupSelected(event: KeyboardEvent) {
    event.stopImmediatePropagation();
    event.preventDefault();
    console.log("Ungroup selected");
    return false;
  };

  private undo() {
    console.log("Undo");
    return false;
  };

  private redo() {
    console.log("Redo");
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
    this.graphComponent.moveGraph({x: 0, y: ShortcutsHandler.MOVE_BY});
    return false;
  }

  private moveDown() {
    this.graphComponent.moveGraph({x: 0, y: -ShortcutsHandler.MOVE_BY});
    return false;
  }

  private moveLeft() {
    this.graphComponent.moveGraph({x: ShortcutsHandler.MOVE_BY, y: 0});
    return false;
  }

  private moveRight() {
    this.graphComponent.moveGraph({x: -ShortcutsHandler.MOVE_BY, y: 0});
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
    console.log("Toggle mode event");
    return false;
  };
}
