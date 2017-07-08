import {Component, OnInit} from "@angular/core";

@Component({
  selector: 'app-shortcuts-dialog',
  templateUrl: './shortcuts-dialog.component.html',
  styleUrls: ['./shortcuts-dialog.component.scss']
})
export class ShortcutsDialogComponent implements OnInit {

  shortcutsGroup = [
    {
      name: 'Basic shortcuts',
      shortcuts: [
        {keys: ['Ctrl', 'A'], description: 'Select all elements'},
        {keys: ['Ctrl', 'F'], description: 'Search for elements'},
        {keys: ['Ctrl', 'S'], description: 'Save graph'},
        {keys: ['Ctrl', '`'], description: 'Toggle edit mode'},
        {keys: ['Esc'], description: 'Leave edit mode and deselect elements'}
      ]
    },
    {
      name: 'Editing shortcuts',
      shortcuts: [
        {keys: ['Del'], description: 'Delete selected elements'},
        {keys: ['Backspace'], description: 'Delete selected elements'},
        {keys: ['Ctrl', 'G'], description: 'Group selected nodes'},
        {keys: ['Ctrl', 'Shift', 'G'], description: 'Ungroup selected node'},
        {keys: ['Ctrl', 'Z'], description: 'Undo last action'},
        {keys: ['Ctrl', 'Y'], description: 'Redo last action'},
        {keys: ['Ctrl', 'C'], description: 'Copy selected nodes'},
        {keys: ['Ctrl', 'V'], description: 'Paste selected nodes'},
        {keys: ['Ctrl', 'X'], description: 'Cut selected nodes with edges'}
      ]
    },
    {
      name: 'Viewport manipulation',
      shortcuts: [
        {keys: ['←'], description: 'Move viewport left'},
        {keys: ['→'], description: 'Move viewport right'},
        {keys: ['↑'], description: 'Move viewport top'},
        {keys: ['↓'], description: 'Move viewport down'},
        {keys: ['-'], description: 'Zoom in graph'},
        {keys: ['Ctrl', '-'], description: 'Zoom in graph'},
        {keys: ['+'], description: 'Zoom out graph'},
        {keys: ['Ctrl', '-'], description: 'Zoom out graph'},
        {keys: ['Ctrl', '0'], description: 'Locate graph'}
      ]
    }
  ];

  constructor() {
  }

  ngOnInit() {
  }

}
