import {GraphService} from "../graph.service";
import {Injectable} from "@angular/core";
import {ExportResult} from "./export-result";

@Injectable()
export class Exporter {

  constructor(protected graphService: GraphService) {
  }

  public doExport(): ExportResult {
    throw new Error('Method doExport not implemented');
  }

  public id(): string {
    throw new Error('Method id not implemented');
  }
}
