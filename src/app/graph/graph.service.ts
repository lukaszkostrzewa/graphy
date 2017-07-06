import {Injectable} from '@angular/core';
import {Subject} from "rxjs/Subject";

@Injectable()
export class GraphService {

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

}
