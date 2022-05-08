import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { CssHeatMapComponent } from './components/css-heat-map/css-heat-map.component';

@NgModule({
  declarations: [
    AppComponent,
    CssHeatMapComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
