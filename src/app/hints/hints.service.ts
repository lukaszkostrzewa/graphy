import {Injectable} from '@angular/core';
import {Hint} from './hint';

@Injectable()
export class HintsService {

  hints: Hint[] = [
    {text: 'You can toggle between edit and view mode using', shortcut: 'Ctrl+`'},
    {text: 'Add a new node with', shortcut: 'Left Click'},
    {text: 'Select all nodes with', shortcut: 'Ctrl+A'},
    {text: 'Toggle lasso selection with', shortcut: 'Ctrl+L'},
  ];

  constructor() {
  }

  getHints(): Promise<Hint[]> {
    return Promise.resolve(this.hints);
  }
}
