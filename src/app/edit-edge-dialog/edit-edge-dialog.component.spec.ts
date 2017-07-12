import {async, ComponentFixture, inject, TestBed} from "@angular/core/testing";

import {EditEdgeDialogComponent} from "./edit-edge-dialog.component";
import {
  MD_DIALOG_DATA,
  MdButtonToggleModule,
  MdDialogRef,
  MdInputModule,
  MdSliderModule
} from "@angular/material";
import {FormsModule} from "@angular/forms";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {DebugElement, NO_ERRORS_SCHEMA} from "@angular/core";
import {By} from "@angular/platform-browser";

describe('EditEdgeDialogComponent', () => {
  let component: EditEdgeDialogComponent;
  let fixture: ComponentFixture<EditEdgeDialogComponent>;
  let page: Page;

  class Page {
    idInput: DebugElement;
    saveBtn: DebugElement;
    cancelBtn: DebugElement;
    source: DebugElement;
    target: DebugElement;
    label: DebugElement;
    weight: DebugElement;
    widthSlider: DebugElement;
    lineStyleButtons: DebugElement[];
    selectedLineStyleButton: DebugElement;
    colorButtons: DebugElement[];
    selectedColorButton: DebugElement;

    addPageElements() {
      const buttons = fixture.debugElement.queryAll(By.css('[md-dialog-actions] button'));
      this.cancelBtn = buttons[0];
      this.saveBtn = buttons[1];
      const inputs = fixture.debugElement.queryAll(By.css('input'));
      this.idInput = inputs[0];
      this.source = inputs[1];
      this.target = inputs[2];
      this.label = inputs[3];
      this.weight = inputs[4];
      this.widthSlider = fixture.debugElement.query(By.css('md-slider'));
      this.lineStyleButtons = fixture.debugElement.queryAll(By.css('.line-style-container md-button-toggle'));
      this.selectedLineStyleButton = fixture.debugElement.query(By.css('.line-style-container .mat-button-toggle-checked'));
      this.colorButtons = fixture.debugElement.queryAll(By.css('.color-container md-button-toggle'));
      this.selectedColorButton = fixture.debugElement.query(By.css('.color-container .mat-button-toggle-checked'));
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule, FormsModule, MdInputModule, MdSliderModule, MdButtonToggleModule
      ],
      declarations: [EditEdgeDialogComponent],
      providers: [{
        provide: MD_DIALOG_DATA, useValue: {element: new EdgeMock()}
      }, {
        provide: MdDialogRef, useValue: {}
      }],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(async(createComponent));

  function createComponent() {
    fixture = TestBed.createComponent(EditEdgeDialogComponent);
    component = fixture.componentInstance;
    page = new Page();
    fixture.detectChanges();
    return fixture.whenStable().then(() => {
      fixture.detectChanges();
      page.addPageElements();
    });
  }

  it('should populate form', inject([MD_DIALOG_DATA], (data) => {
    const edgeMock: EdgeMock = data.element;
    expect(page.idInput.nativeElement.value).toEqual('' + edgeMock.id());
    expect(page.source.nativeElement.value).toEqual('' + edgeMock._data.source);
    expect(page.target.nativeElement.value).toEqual('' + edgeMock._data.target);
    expect(page.label.nativeElement.value).toEqual('' + edgeMock._data.label);
    expect(page.weight.nativeElement.value).toEqual('' + edgeMock._data.weight);
    expect(page.widthSlider.nativeElement.getAttribute('ng-reflect-value')).toEqual(edgeMock._css.width);
    expect(page.lineStyleButtons.length).toEqual(3);
    expect(page.colorButtons.length).toEqual(4);
    expect(page.selectedLineStyleButton.nativeElement.classList).toContain(edgeMock._css['line-style']);
    expect(page.selectedColorButton.nativeElement.classList).toContain(edgeMock._data.color);
  }));

  it('should save data', inject([MD_DIALOG_DATA], (data) => {
    const edgeMock: EdgeMock = data.element;
    const newLabel: string = 'New label';
    const newWeight: number = 10;
    const oldColor: string = edgeMock._data.color;
    const newColor: string = oldColor; // change to 'primary'
    page.label.nativeElement.value = newLabel;
    page.weight.nativeElement.value = newWeight;
    page.label.nativeElement.dispatchEvent(new Event('input'));
    page.weight.nativeElement.dispatchEvent(new Event('input'));
    let newColorRadioBtn = fixture.debugElement.query(By.css('.' + newColor)).nativeElement;
    newColorRadioBtn.setAttribute("checked", "checked");
    newColorRadioBtn.checked = true;
    newColorRadioBtn.dispatchEvent(new Event('input')); //todo:why it does not got updated?
    spyOn(edgeMock, 'addClass');
    spyOn(edgeMock, 'removeClass');
    fixture.detectChanges();

    page.saveBtn.triggerEventHandler('click', null);

    fixture.detectChanges();
    expect(edgeMock._data.label).toEqual(newLabel);
    expect(edgeMock._data.weight).toEqual(newWeight);
    expect(edgeMock.removeClass).toHaveBeenCalledWith(oldColor + '-color');
    expect(edgeMock.addClass).toHaveBeenCalledWith(newColor + '-color');
  }));
});

class EdgeMock {

  _data = {
    source: 2,
    target: 3,
    label: 'test label',
    weight: 4,
    color: 'secondary'
  };
  _css = {
    width: '5',
    'line-style': 'dotted'
  };

  id() {
    return 1;
  }

  public data(name: string, value: string): string | void {
    if (typeof value === 'undefined') {
      return this._data[name];
    } else {
      this._data[name] = value;
    }
  }

  public css(name: string, value: string): string | void {
    if (typeof value === 'undefined') {
      return this._css[name];
    } else {
      this._css[name] = value;
    }
  }

  numericStyle(name): number {
    return +this._css[name];
  }

  addClass() {
  }

  removeClass() {
  }
}
