import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateBrandComponent } from './create-brand.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [CreateBrandComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[CreateBrandComponent]

})
export class CreateBrandModule { }
