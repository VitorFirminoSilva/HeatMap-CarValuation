import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateCarComponent } from './create-car.component';
import { ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [CreateCarComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[CreateCarComponent]
})
export class CreateCarModule { }
