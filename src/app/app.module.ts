import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {SlickModule} from "ngx-slick";
import {HintsComponent} from "./hints/hints.component";
import {HotkeyModule} from "angular2-hotkeys";
import {
  MdButtonModule, MdButtonToggleModule,
  MdIconModule,
  MdSidenavModule,
  MdSnackBarModule,
  MdToolbarModule,
  MdTooltipModule
} from "@angular/material";
import {AccountButtonComponent} from "./account-button/account-button.component";
import {MainToolbarComponent} from "./main-toolbar/main-toolbar.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import "hammerjs";
import {GraphComponent} from "./graph/graph.component";
import {ZoomButtonsComponent} from './zoom-buttons/zoom-buttons.component';

@NgModule({
  declarations: [
    AppComponent,
    HintsComponent,
    AccountButtonComponent,
    MainToolbarComponent,
    GraphComponent,
    ZoomButtonsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SlickModule.forRoot(),
    HotkeyModule.forRoot(),
    MdButtonModule,
    MdButtonToggleModule,
    MdToolbarModule,
    MdIconModule,
    MdSidenavModule,
    MdTooltipModule,
    MdSnackBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
