import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SlickModule} from "ngx-slick";
import {HintsComponent} from './hints/hints.component';
import {HotkeyModule} from "angular2-hotkeys";
import {MdButtonModule} from "@angular/material";
import {AccountButtonComponent} from './account-button/account-button.component';

@NgModule({
  declarations: [
    AppComponent,
    HintsComponent,
    AccountButtonComponent
  ],
  imports: [
    BrowserModule,
    SlickModule.forRoot(),
    HotkeyModule.forRoot(),
    MdButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
