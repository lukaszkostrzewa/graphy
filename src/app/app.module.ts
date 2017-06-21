import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SlickModule} from "ngx-slick";
import {HintsComponent} from './hints/hints.component';
import {HotkeyModule} from "angular2-hotkeys";
import {
  MdButtonModule, MdIconModule, MdSidenavModule, MdToolbarModule,
  MdTooltipModule
} from "@angular/material";
import {AccountButtonComponent} from './account-button/account-button.component';
import {MainToolbarComponent} from './main-toolbar/main-toolbar.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    HintsComponent,
    AccountButtonComponent,
    MainToolbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SlickModule.forRoot(),
    HotkeyModule.forRoot(),
    MdButtonModule,
    MdToolbarModule,
    MdIconModule,
    MdSidenavModule,
    MdTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
