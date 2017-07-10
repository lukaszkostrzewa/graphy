import {Component, Inject, OnInit} from "@angular/core";
import {MD_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-edit-node-dialog',
  templateUrl: './edit-node-dialog.component.html',
  styleUrls: ['./edit-node-dialog.component.scss']
})
export class EditNodeDialogComponent implements OnInit {

  ngOnInit(): void {
  }

  public readonly node: Cy.CollectionNodes;
  public readonly id: string;
  public readonly parent: string;

  public label: string;

  public shapes: string[] = [
    'rectangle', 'roundrectangle', 'cutrectangle', 'ellipse', 'triangle', 'pentagon', 'hexagon',
    'heptagon', 'octagon', 'star', 'diamond', 'vee', 'rhomboid'
  ];
  public colors: any = ['default', 'lighter', 'primary', 'secondary'];

  public selectedShape: string;
  public selectedSize: number;
  public selectedColor: string;

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    this.shapes.sort();
    this.node = data.element;
    this.id = this.node.id();
    this.parent = this.node.parent().id();
    this.label = this.node.data('label');
    this.selectedShape = this.node.css('shape');
    this.selectedSize = this.node.numericStyle('width');
    this.selectedColor = this.node.data('color') || 'default';
  }

  save() {
    this.node.data('label', this.label);
    this.node.css('shape', this.selectedShape);
    this.node.removeClass(this.node.data('color') + '-color');
    this.node.data('color', this.selectedColor);
    this.node.addClass(this.selectedColor + '-color');
    this.node.css('height', this.selectedSize + 'px');
    this.node.css('width', this.selectedSize + 'px');
  }
}
