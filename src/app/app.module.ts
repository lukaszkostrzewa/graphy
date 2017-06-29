import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {SlickModule} from "ngx-slick";
import {HintsComponent} from "./hints/hints.component";
import {HotkeyModule} from "angular2-hotkeys";
import {
  MdButtonModule, MdButtonToggleModule,
  MdIconModule, MdMenuModule,
  MdSidenavModule,
  MdSnackBarModule,
  MdToolbarModule,
  MdTooltipModule,
  MdListModule, MdDialogModule
} from "@angular/material";
import {AccountButtonComponent} from "./account-button/account-button.component";
import {MainToolbarComponent} from "./main-toolbar/main-toolbar.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import "hammerjs";
import {GraphComponent} from "./graph/graph.component";
import {ZoomButtonsComponent} from './zoom-buttons/zoom-buttons.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {LocateButtonComponent} from './locate-button/locate-button.component';
import {LayoutSwitchComponent} from './layout-switch/layout-switch.component';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {ImportDialogComponent} from './import-dialog/import-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    HintsComponent,
    AccountButtonComponent,
    MainToolbarComponent,
    GraphComponent,
    ZoomButtonsComponent,
    FileUploadComponent,
    LocateButtonComponent,
    LayoutSwitchComponent,
    SideMenuComponent,
    ImportDialogComponent
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
    MdSnackBarModule,
    MdMenuModule,
    MdListModule,
    MdDialogModule
  ],
  entryComponents: [
    ImportDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
