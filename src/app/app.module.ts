import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {SlickModule} from "ngx-slick";
import {HintsComponent} from './hints/hints.component';

@NgModule({
  declarations: [
    AppComponent,
    HintsComponent
  ],
  imports: [
    BrowserModule,
    SlickModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
