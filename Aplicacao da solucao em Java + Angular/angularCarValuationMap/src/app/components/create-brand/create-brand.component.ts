import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss']
})
export class CreateBrandComponent implements OnInit {

  options: FormGroup;

  constructor(fb: FormBuilder) {
    this.options = fb.group({
        nameBrand: new FormControl('', Validators.compose([
          Validators.minLength(60),
          Validators.required,
        ])),
        description: new FormControl('', Validators.compose([
          Validators.minLength(2500),
          Validators.required,
        ])),

    });
  }

  ngOnInit(): void {
  }

  submitForm() {
    console.log(this.options);
  }

}
