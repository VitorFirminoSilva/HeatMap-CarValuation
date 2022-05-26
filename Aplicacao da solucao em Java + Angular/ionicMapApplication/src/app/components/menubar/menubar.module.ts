import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenubarComponent } from './menubar.component';
import { IonicModule } from '@ionic/angular';
import { CreateBrandModule } from '../create-brand/create-brand.module';
import { CreateCarModule } from '../create-car/create-car.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [MenubarComponent],
  imports: [
    CommonModule,
    IonicModule,
    CreateBrandModule,
    CreateCarModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[MenubarComponent]
  
})
export class MenubarModule { }
