import {BrowserModule} from "@angular/platform-browser";
import {NgModule} from "@angular/core";

import {AppComponent} from "./app.component";
import {SlickModule} from "ngx-slick";
import {HintsComponent} from "./hints/hints.component";
import {
  MdAutocompleteModule,
  MdButtonModule,
  MdButtonToggleModule,
  MdCheckboxModule,
  MdDialogModule,
  MdIconModule,
  MdInputModule,
  MdListModule,
  MdMenuModule,
  MdSelectModule,
  MdSidenavModule,
  MdSliderModule,
  MdSnackBarModule,
  MdToolbarModule,
  MdTooltipModule
} from "@angular/material";
import {AccountButtonComponent} from "./account-button/account-button.component";
import {MainToolbarComponent} from "./main-toolbar/main-toolbar.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import "hammerjs";
import {GraphComponent} from "./graph/graph.component";
import {ZoomButtonsComponent} from "./zoom-buttons/zoom-buttons.component";
import {FileUploadComponent} from "./file-upload/file-upload.component";
import {LocateButtonComponent} from "./locate-button/locate-button.component";
import {LayoutSwitchComponent} from "./layout-switch/layout-switch.component";
import {SideMenuComponent} from "./side-menu/side-menu.component";
import {ImportDialogComponent} from "./import-dialog/import-dialog.component";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ContextMenusExtension} from "./graph/extensions/context-menus.extension";
import {EdgeBendEditingExtension} from "./graph/extensions/edge-bend-editing.extension";
import {EdgeHandlesExtension} from "./graph/extensions/edge-handles.extension";
import {NodeAdditionExtension} from "./graph/extensions/node-addition.extension";
import {ShortcutsExtension} from "./graph/extensions/shortcuts.extension";
import {NewDialogComponent} from "./new-dialog/new-dialog.component";
import {ExportDialogComponent} from "./export-dialog/export-dialog.component";
import {ShortcutsDialogComponent} from "./shortcuts-dialog/shortcuts-dialog.component";
import {NeighborsHighlightExtension} from "./graph/extensions/neighbors-highlight-extension";
import {EditNodeDialogComponent} from "./edit-node-dialog/edit-node-dialog.component";
import {EditEdgeDialogComponent} from "./edit-edge-dialog/edit-edge-dialog.component";
import {OptionsButtonComponent} from './options-button/options-button.component';
import {GraphOptionsDialogComponent} from './graph-options-dialog/graph-options-dialog.component';
import {AlgorithmsMenuComponent} from './algorithms-menu/algorithms-menu.component';
import {EditModeAwareExtension} from "./graph/extensions/edit-mode-aware.extension";

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
    ImportDialogComponent,
    EditModeAwareExtension,
    ContextMenusExtension,
    EdgeBendEditingExtension,
    EdgeHandlesExtension,
    NodeAdditionExtension,
    ShortcutsExtension,
    NeighborsHighlightExtension,
    NewDialogComponent,
    ExportDialogComponent,
    ShortcutsDialogComponent,
    EditNodeDialogComponent,
    EditEdgeDialogComponent,
    OptionsButtonComponent,
    GraphOptionsDialogComponent,
    AlgorithmsMenuComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SlickModule.forRoot(),
    MdButtonModule,
    MdButtonToggleModule,
    MdToolbarModule,
    MdIconModule,
    MdSidenavModule,
    MdTooltipModule,
    MdSnackBarModule,
    MdMenuModule,
    MdListModule,
    MdDialogModule,
    FormsModule,
    ReactiveFormsModule,
    MdInputModule,
    MdAutocompleteModule,
    MdSelectModule,
    MdSliderModule,
    MdCheckboxModule
  ],
  entryComponents: [
    ImportDialogComponent,
    ExportDialogComponent,
    EditNodeDialogComponent,
    EditEdgeDialogComponent,
    NewDialogComponent,
    ShortcutsDialogComponent,
    GraphOptionsDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
