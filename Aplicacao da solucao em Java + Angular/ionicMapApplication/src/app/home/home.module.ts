import { NgModule } from '@angular/core';
import { CommonModule} from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { MondrianMapComponent } from '../components/mondrian-map/mondrian-map.component';
import { MenubarModule } from '../components/menubar/menubar.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    HomePageRoutingModule,
    MenubarModule,
    
  ],
  declarations: [HomePage, MondrianMapComponent]
})
export class HomePageModule {}
