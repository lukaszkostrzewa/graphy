import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {

  @ViewChild('graphContainer') container: ElementRef;
  private graph = {nodes: [], edges: []};

  constructor() {
  }

  ngOnInit() {
    let N = 10, E = 40;
    for (let i = 0; i < N; i++) {
      this.graph.nodes.push({
        id: 'n' + i,
        label: 'Node ' + i,
        x: Math.random(),
        y: Math.random(),
        size: Math.random(),
        color: '#666'
      });
    }
    for (let i = 0; i < E; i++) {
      this.graph.edges.push({
        id: 'e' + i,
        source: 'n' + (Math.random() * N | 0),
        target: 'n' + (Math.random() * N | 0),
        size: Math.random(),
        color: '#cfcfcf'
      });
    }
  }

  ngAfterViewInit(): void {
    new sigma({
      graph: this.graph,
      container: this.container.nativeElement.id
    });
  }

}
