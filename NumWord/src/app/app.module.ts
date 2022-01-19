import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule} from "@angular/forms";

import {AppComponent} from './app.component';
import {NumWordPipe} from "./numword.pipe";

@NgModule({
  declarations: [
    AppComponent,
    NumWordPipe
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
