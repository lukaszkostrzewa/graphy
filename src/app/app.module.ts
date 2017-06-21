import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SlickModule} from "ngx-slick";
import {HintsComponent} from './hints/hints.component';
import {HotkeyModule} from "angular2-hotkeys";
import {MdButtonModule, MdIconModule, MdSidenavModule, MdToolbarModule} from "@angular/material";
import {AccountButtonComponent} from './account-button/account-button.component';
import {MainToolbarComponent} from './main-toolbar/main-toolbar.component';

@NgModule({
  declarations: [
    AppComponent,
    HintsComponent,
    AccountButtonComponent,
    MainToolbarComponent
  ],
  imports: [
    BrowserModule,
    SlickModule.forRoot(),
    HotkeyModule.forRoot(),
    MdButtonModule,
    MdToolbarModule,
    MdIconModule,
    MdSidenavModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
