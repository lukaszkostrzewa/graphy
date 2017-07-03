import {Component, Inject} from "@angular/core";
import {MD_DIALOG_DATA} from "@angular/material";
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-edit-element-dialog',
  templateUrl: './edit-element-dialog.component.html',
  styleUrls: ['./edit-element-dialog.component.scss']
})
export class EditElementDialogComponent {

  public el: Cy.CollectionElements;
  public existingProperties: Property[] = [];
  public existingPropertiesFormGroup: FormGroup;
  public newPropertiesFormGroups: FormGroup[] = [];

  constructor(@Inject(MD_DIALOG_DATA) public data: any) {
    this.el = data.element;
    this.existingProperties = this.getExistingProperties(this.el.data());
    this.existingPropertiesFormGroup = this.existingProperties
      .sort(EditElementDialogComponent.propertyComparator())
      .reduce((formGroup: FormGroup, property: Property) => {
        formGroup.addControl(property.key, new FormControl({
          value: property.value,
          disabled: property.disabled
        }));
        return formGroup;
      }, new FormGroup({}));
  }

  save() {
    this.el.removeData();
    Object.keys(this.existingPropertiesFormGroup.value)
      .forEach(key => this.el.data(key, this.existingPropertiesFormGroup.value[key]));
    this.newPropertiesFormGroups
      .filter(formGroup => formGroup.value['key'])
      .forEach(formGroup => this.el.data(formGroup.value['key'], formGroup.value['value']));
  }

  addNewProperty() {
    this.newPropertiesFormGroups.push(new FormGroup({
      'key': new FormControl(''),
      'value': new FormControl('')
    }));
  }

  deleteNewProperty(i: number) {
    this.newPropertiesFormGroups.splice(i, 1);
  }

  deleteExistingProperty(key: string) {
    this.existingProperties = this.existingProperties.filter(input => input.key !== key);
    this.existingPropertiesFormGroup.removeControl(key);
  }

  private getExistingProperties(data: {}): Property[] {
    let existingProperties: Property[] = [];
    Object.keys(data).forEach((key) => {
      let disabled = this.data.readonlyProperties.includes(key);
      let value = data[key];
      if (value !== undefined) {
        existingProperties.push({key, value, disabled});
      }
    });
    return existingProperties;
  }

  private static propertyComparator() {
    return (p1, p2) => (p1.disabled === p2.disabled ? 0 : p1.disabled ? -1 : 1);
  }
}

class Property {
  key: string;
  value: string;
  disabled: boolean;
}
