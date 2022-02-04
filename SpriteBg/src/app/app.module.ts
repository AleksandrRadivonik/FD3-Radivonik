import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {SpriteBgDirective} from "./sprite-bg.attr.directive";

@NgModule({
  declarations: [
    AppComponent,
    SpriteBgDirective
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
