import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SlickModule} from "ngx-slick";
import {HintsComponent} from './hints/hints.component';
import {HotkeyModule} from "angular2-hotkeys";

@NgModule({
  declarations: [
    AppComponent,
    HintsComponent
  ],
  imports: [
    BrowserModule,
    SlickModule.forRoot(),
    HotkeyModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
