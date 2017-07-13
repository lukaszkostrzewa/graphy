import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {AccountButtonComponent} from './account-button.component';
import {MdMenuModule} from '@angular/material';
import {By} from '@angular/platform-browser';
import {DebugElement, NO_ERRORS_SCHEMA} from '@angular/core';
import {FirstLetterPipe} from '../common/first-letter.pipe';

describe('AccountButtonComponent', () => {
  let component: AccountButtonComponent;
  let fixture: ComponentFixture<AccountButtonComponent>;
  let page: Page;

  class Page {
    btnAccount: DebugElement;
    btnLogIn: DebugElement;

    detectChangesAndUpdateElements() {
      fixture.detectChanges();
      this.btnAccount = fixture.debugElement.query(By.css('.btn-account'));
      this.btnLogIn = fixture.debugElement.query(By.css('.btn-log-in'));
    }

    clickLogIn() {
      this.btnLogIn.triggerEventHandler('click', null);
      this.detectChangesAndUpdateElements();
    }
  }

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [MdMenuModule],
      declarations: [AccountButtonComponent, FirstLetterPipe],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountButtonComponent);
    component = fixture.componentInstance;
    page = new Page();
    page.detectChangesAndUpdateElements();
  });

  it('should display log in button if not logged in', () => {
    expect(page.btnLogIn).toBeTruthy();
    expect(page.btnAccount).toBeFalsy();
  });

  it('should display account button after log in is clicked', () => {
    page.clickLogIn();

    expect(page.btnLogIn).toBeFalsy();
    expect(page.btnAccount).toBeTruthy();
    expect(page.btnAccount.nativeElement.textContent.trim()).toEqual('J');
  });
});
