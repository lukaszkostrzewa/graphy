import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ShortcutsDialogComponent} from './shortcuts-dialog.component';
import {MdListModule} from '@angular/material';

describe('ShortcutsDialogComponent', () => {
  let component: ShortcutsDialogComponent;
  let fixture: ComponentFixture<ShortcutsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdListModule],
      declarations: [ShortcutsDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortcutsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
