import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {OptionsButtonComponent} from './options-button.component';

describe('OptionsButtonComponent', () => {
  let component: OptionsButtonComponent;
  let fixture: ComponentFixture<OptionsButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OptionsButtonComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OptionsButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
