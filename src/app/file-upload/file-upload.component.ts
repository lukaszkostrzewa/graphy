import {Component, EventEmitter, Output} from "@angular/core";

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Output() private uploaded = new EventEmitter<string>();

  fileChange(event) {
    let fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      let file: File = fileList[0];
      let reader: FileReader = new FileReader();
      reader.onload = (e) => this.uploaded.emit((<any>e.target).result);
      reader.readAsText(file, 'UTF-8');
    }
  }

}
