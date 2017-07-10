import {Injectable} from "@angular/core";
import {Subject} from "rxjs/Subject";
import cytoscape from "cytoscape/dist/cytoscape.js";

@Injectable()
export class GraphService {

  private cy: Cy.Instance;

  private editSubject = new Subject<boolean>();
  editObservable = this.editSubject.asObservable();

  constructor() {
  }

  editModeOn() {
    this.editSubject.next(true);
  }

  editModeOff() {
    this.editSubject.next(false);
  }

  initialize(container): Cy.Instance {
    this.cy = cytoscape(this.getConfig(container));
    return this.cy;
  }

  getCy(): Cy.Instance {
    return this.cy;
  }

  private getConfig(container) {
    return {
      container: container,
      elements: [
        {data: {id: 'a', label: 'A'}},
        {data: {id: 'b', label: 'B'}},
        {data: {id: 'c', label: 'C'}},
        {data: {id: 'ab', source: 'a', target: 'b', weight: '1'}},
        {data: {id: 'bc', source: 'b', target: 'c', weight: '1'}},
        {data: {id: 'ac', source: 'a', target: 'c', weight: '100'}}
      ],
      layout: {
        name: 'grid'
      },
      style: [{
        "selector": "node",
        "style": {
          "content": "data(label)",
        }
      }, {
        "selector": "edge",
        "style": {
          "text-margin-y": "-12px",
          "content": "data(weight)",
        }
      }, {
        "selector": '.highlighted',
        "style": {
          'background-color': '#61bffc',
          'line-color': '#61bffc',
          'target-arrow-color': '#61bffc',
          'transition-property': 'background-color, line-color, target-arrow-color',
          'transition-duration': '0.5s'
        }
      }, {
        "selector": 'node.default-color',
        "style": {
          "background-color": "#666666"
        }
      }, {
        "selector": 'node.lighter-color',
        "style": {
          "background-color": "#cccccc"
        }
      }, {
        "selector": 'node.primary-color',
        "style": {
          "background-color": "#3f51b5"
        }
      }, {
        "selector": 'node.secondary-color',
        "style": {
          "background-color": "#579cff"
        }
      }, {
        "selector": 'edge.default-color',
        "style": {
          "line-color": "#aaaaaa"
        }
      }, {
        "selector": 'edge.lighter-color',
        "style": {
          "line-color": "#dddddd"
        }
      }, {
        "selector": 'edge.primary-color',
        "style": {
          "line-color": "#7285ee"
        }
      }, {
        "selector": 'edge.secondary-color',
        "style": {
          "line-color": "#bbd7ff"
        }
      }, {
        "selector": '.hover',
        "style": {
          'background-color': '#4580e5',
          'line-color': '#4580e5',
          'target-arrow-color': '#4580e5',
          'transition-property': 'background-color, line-color, target-arrow-color',
          'transition-duration': '0.2s'
        }
      }
      ],
      wheelSensitivity: 0.2,
      boxSelectionEnabled: true
    };
  }
}
