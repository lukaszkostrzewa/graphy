import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent {

  @Output() private uploaded = new EventEmitter<string>();
  @Input() allowedExtensions: string[];

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      const file: File = fileList[0];
      const reader: FileReader = new FileReader();
      reader.onload = (e) => this.uploaded.emit((<any>e.target).result);
      reader.readAsText(file, 'UTF-8');
    }
  }
}
