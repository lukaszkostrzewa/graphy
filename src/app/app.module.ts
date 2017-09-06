import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {SlickModule} from 'ngx-slick';
import {HintsComponent} from './hints/hints.component';
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
  MdSlideToggleModule,
  MdSnackBarModule,
  MdToolbarModule,
  MdTooltipModule
} from '@angular/material';
import {AccountButtonComponent} from './account-button/account-button.component';
import {MainToolbarComponent} from './main-toolbar/main-toolbar.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import 'hammerjs';
import {GraphComponent} from './graph/graph.component';
import {ZoomButtonsComponent} from './zoom-buttons/zoom-buttons.component';
import {FileUploadComponent} from './file-upload/file-upload.component';
import {LocateButtonComponent} from './locate-button/locate-button.component';
import {LayoutSwitchComponent} from './layout-switch/layout-switch.component';
import {SideMenuComponent} from './side-menu/side-menu.component';
import {ImportDialogComponent} from './import-dialog/import-dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ContextMenusDirective} from './graph/extensions/context-menus.directive';
import {EdgeBendEditingDirective} from './graph/extensions/edge-bend-editing.directive';
import {EdgeHandlesDirective} from './graph/extensions/edge-handles.directive';
import {NodeAdditionDirective} from './graph/extensions/node-addition.directive';
import {ShortcutsDirective} from './graph/extensions/shortcuts.directive';
import {NewDialogComponent} from './new-dialog/new-dialog.component';
import {ExportDialogComponent} from './export-dialog/export-dialog.component';
import {ShortcutsDialogComponent} from './shortcuts-dialog/shortcuts-dialog.component';
import {NeighborsHighlightDirective} from './graph/extensions/neighbors-highlight.directive';
import {EditNodeDialogComponent} from './edit-node-dialog/edit-node-dialog.component';
import {EditEdgeDialogComponent} from './edit-edge-dialog/edit-edge-dialog.component';
import {OptionsButtonComponent} from './options-button/options-button.component';
import {GraphOptionsDialogComponent} from './graph-options-dialog/graph-options-dialog.component';
import {AlgorithmsMenuComponent} from './algorithms-menu/algorithms-menu.component';
import {EditModeAwareDirective} from './graph/extensions/edit-mode-aware.directive';
import {FirstLetterPipe} from './common/first-letter.pipe';
import {GraphService} from './graph/graph.service';
import {algorithms, exporters, parsers} from './services.config';

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
    EditModeAwareDirective,
    ContextMenusDirective,
    EdgeBendEditingDirective,
    EdgeHandlesDirective,
    NodeAdditionDirective,
    ShortcutsDirective,
    NeighborsHighlightDirective,
    NewDialogComponent,
    ExportDialogComponent,
    ShortcutsDialogComponent,
    EditNodeDialogComponent,
    EditEdgeDialogComponent,
    OptionsButtonComponent,
    GraphOptionsDialogComponent,
    AlgorithmsMenuComponent,
    FirstLetterPipe
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
    MdCheckboxModule,
    MdSlideToggleModule
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
  providers: [
    GraphService,
    ...parsers,
    ...exporters,
    ...algorithms
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
