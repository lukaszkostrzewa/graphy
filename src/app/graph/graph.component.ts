import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit, AfterViewInit {

  @ViewChild('graphContainer') container: ElementRef;

  private editMode: boolean;
  private cy: Cy.Instance;

  setEditMode(value) {
    this.editMode = value;
    this.container.nativeElement.classList.toggle('edit-mode', value);
  }

  constructor() {
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    this.cy = cytoscape({
      container: this.container.nativeElement,
      elements: [
        {data: {id: 'a'}},
        {data: {id: 'b'}},
        {data: {id: 'ab', source: 'a', target: 'b'}}
      ],
      layout: {
        name: 'grid'
      }
    });
  }

}
