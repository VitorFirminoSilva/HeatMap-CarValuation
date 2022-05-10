import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBrandComponent } from './create-brand.component';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateBrandComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports:[CreateBrandComponent]

})
export class CreateBrandModule { }
