export class ExportFormat {

  private static readonly AVAILABLE_FORMATS = [
    {id: 'json-cytoscape', name: 'JSON Cytoscape', extension: 'json'},
    {id: 'graphml', name: 'GraphML', extension: 'xml'},
    {id: 'png', name: 'PNG', extension: 'png'},
    {id: 'jpg', name: 'JPG', extension: 'jpg'}
  ];

  id: string;
  name: string;
  extension: string;

  static all(): ExportFormat[] {
    return ExportFormat.AVAILABLE_FORMATS;
  }

  static jsonCytoscape(): ExportFormat {
    return ExportFormat.get('json-cytoscape');
  }

  static get(id: string): ExportFormat {
    return ExportFormat.all().find(f => f.id === id);
  }
}
