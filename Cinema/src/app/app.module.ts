import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HallComponent} from './hall.component';
import {CashComponent} from './cash.component';
import {CinemaComponent} from "./cinema.component";
import {TicketsService} from "./tickets.service";

@NgModule({
  declarations: [
    CinemaComponent,
    HallComponent,
    CashComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [TicketsService],
  bootstrap: [CinemaComponent]
})
export class AppModule { }
