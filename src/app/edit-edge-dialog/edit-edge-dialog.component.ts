import {Component, Inject, OnInit} from "@angular/core";
import {MD_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-edit-edge-dialog',
  templateUrl: './edit-edge-dialog.component.html',
  styleUrls: ['./edit-edge-dialog.component.scss']
})
export class EditEdgeDialogComponent implements OnInit {

  ngOnInit(): void {
  }

  public readonly edge: Cy.CollectionEdges;
  public readonly id: string;
  public readonly source: string;
  public readonly target: string;

  public label: string;
  public weight: number;

  public lineStyles: string[] = ['solid', 'dashed', 'dotted'];
  public colors: string[] = ['default', 'lighter', 'primary', 'secondary'];

  public selectedWidth: number;
  public selectedLineStyle: string;
  public selectedColor: string;

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    this.edge = data.element;
    this.id = this.edge.id();
    this.source = this.edge.data('source');
    this.target = this.edge.data('target');
    this.label = this.edge.data('label');
    this.weight = this.edge.data('weight');
    this.selectedWidth = this.edge.numericStyle('width');
    this.selectedLineStyle = this.edge.css('line-style');
    this.selectedColor = this.edge.data('color') || 'default';
  }

  save() {
    this.edge.data('label', this.label);
    this.edge.data('weight', this.weight);
    this.edge.css('width', this.selectedWidth + 'px');
    this.edge.css('line-style', this.selectedLineStyle);
    this.edge.removeClass(this.edge.data('color') + '-color');
    this.edge.data('color', this.selectedColor);
    this.edge.addClass(this.selectedColor + '-color');
  }
}
