import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {HintsComponent} from './hints.component';
import {SlickModule} from "ngx-slick";

describe('HintsComponent', () => {
  let component: HintsComponent;
  let fixture: ComponentFixture<HintsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [SlickModule.forRoot()],
      declarations: [HintsComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HintsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
