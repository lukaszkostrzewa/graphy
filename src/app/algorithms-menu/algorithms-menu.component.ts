import {Component, EventEmitter, OnInit, Output, ViewChild} from "@angular/core";

@Component({
  selector: 'app-algorithms-menu',
  templateUrl: './algorithms-menu.component.html',
  styleUrls: ['./algorithms-menu.component.scss']
})
export class AlgorithmsMenuComponent implements OnInit {

  @ViewChild('algorithmsMenu') menu: any;
  @Output() algorithmSelected = new EventEmitter<string>();

  algorithmGroups = [{
    name: 'Graph traversal',
    algorithms: [{
      name: 'bfs', displayName: 'Breadth-first search'
    }, {
      name: 'dfs',
      displayName: 'Depth-first search'
    }]
  }, {
    name: 'Shortest path', algorithms: [{
      name: 'dijkstra', displayName: 'Dijkstra\'s algorithm'
    }]
  }, {
    name: 'Minimum spanning tree',
    algorithms: [{
      name: 'kruskal', displayName: 'Kruskal\'s algorithm'
    }]
  }, {
    name: 'Minimum cut',
    algorithms: [{
      name: 'karger-stein', displayName: 'Karger-Stein algorithm'
    }]
  }];

  constructor() {
  }

  ngOnInit() {
  }

  selectAlgorithm(algorithm: string) {
    this.algorithmSelected.emit(algorithm);
  }
}
