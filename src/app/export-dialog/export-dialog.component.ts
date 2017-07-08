import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.scss']
})
export class ExportDialogComponent implements OnInit {

  supportedFormats: ExportFormat[] = [
    {id: 'json-cytoscape', name: 'JSON Cytoscape'},
    {id: 'graphml', name: 'GraphML'},
    {id: 'png', name: 'PNG'},
    {id: 'jpg', name: 'JPG'}
  ];

  selectedFormat: ExportFormat;

  constructor() {
  }

  ngOnInit() {
  }
}

class ExportFormat {
  id: string;
  name: string;
}
