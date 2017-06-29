import {Injectable} from '@angular/core';
import {Layout} from "../layout/layout";

@Injectable()
export class LayoutService {

  constructor() {
  }

  getLayouts(): Layout[] {
    return [
      new Layout('random', 'Random'),
      new Layout('grid', 'Grid'),
      new Layout('circle', 'Circle'),
      new Layout('concentric', 'Concentric'),
      new Layout('breadthfirst', 'Breadth-first'),
      new Layout('cose', 'Compound Spring Embedder'),
    ];
  }

}
