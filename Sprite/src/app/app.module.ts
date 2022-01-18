import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HostComponent } from './host.component';
import { SpriteComponent } from './sprite.component';

@NgModule({
  declarations: [
    HostComponent,
    SpriteComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [HostComponent]
})
export class AppModule { }
