import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { CssHeatMapComponent } from './components/css-heat-map/css-heat-map.component';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ModalModule } from './modules/modal/modal.module'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateBrandComponent } from './components/create-brand/create-brand.component';

@NgModule({
  declarations: [
    AppComponent,
    CssHeatMapComponent,
    CreateBrandComponent,
  ],
  imports: [
    BrowserModule, HttpClientModule, MatButtonModule, MatIconModule, ModalModule, BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
