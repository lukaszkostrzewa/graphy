import {inject, TestBed} from "@angular/core/testing";

import {ShortcutsService} from "./shortcuts.service";
import {HotkeyModule} from "angular2-hotkeys";
import {MdSnackBarModule} from "@angular/material";

describe('ShortcutsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HotkeyModule.forRoot(), MdSnackBarModule],
      providers: [ShortcutsService]
    });
  });

  it('should be created', inject([ShortcutsService], (service: ShortcutsService) => {
    expect(service).toBeTruthy();
  }));
});
