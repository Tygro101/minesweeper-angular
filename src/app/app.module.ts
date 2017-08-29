import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponentTop } from './app.component.top';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponentTop,
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponentTop]
})
export class AppModule { }
