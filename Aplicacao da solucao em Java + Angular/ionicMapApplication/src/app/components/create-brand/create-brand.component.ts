import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AccessApiService } from 'src/app/services/access-api.service';

interface Brand{
  brandName?: string;
  description?: string;
}

@Component({
  selector: 'app-create-brand',
  templateUrl: './create-brand.component.html',
  styleUrls: ['./create-brand.component.scss'],
})
export class CreateBrandComponent implements OnInit {

  public form: FormGroup;

  @Input() modalController: ModalController;

  constructor(  private formBuilder: FormBuilder, 
                public alertController: AlertController,
                public accessApi: AccessApiService,
                private loadingCtrl: LoadingController 
              ) { 
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      brandName: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      description: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2500)]]
    });
  }


  validation_messages = {
    'brandName': [
      { type: 'required', message: 'Brand name is required.' },
      { type: 'minlength', message: 'Brand name must be at least 2 characters long.' },
      { type: 'maxlength', message: 'Brand name must have a maximum of 60 characters' }
    ],
    'description': [
      { type: 'required', message: 'Description is required.' },
      { type: 'minlength', message: 'Description must be at least 10 characters long.' },
      { type: 'maxlength', message: 'Description must have a maximum of 60 characters' }
    ],
  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true,
      'newBrand': false,
    });
  }

  public async submitForm() {

    if(!this.form.valid){
      return;
    }
    
    const loading = await this.loadingCtrl.create({
      message: "Creating...",
    });
    await loading.present();
    
    if(this.form.status === "INVALID"){
      console.log(this.form);
      if(this.form.controls.brandName.errors != null && this.form.controls.brandName.errors.required){
        this.presentAlert("Brand is Required.", "ERRO");
      }
      if(this.form.controls.description.errors != null && this.form.controls.description.errors.required){
        this.presentAlert("Description is Required.", "ERRO");
      }
      return;
    }

    const brand: Brand = {} as any;

    brand.brandName = this.form.value.brandName;
    brand.description = this.form.value.description;

    await this.accessApi.createBrand(brand);
    this.loadingCtrl.dismiss();

    this.modalController.dismiss({
      'dismissed': true,
      'newBrand': true,
    });
  }

  async presentAlert(msg: string, type: string) {
    const alert = await this.alertController.create({
      header: type,
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }


  verifyTouchedANDValid(field: any){
    return this.form.get(field).invalid && (this.form.get(field).dirty || this.form.get(field).touched);
  }

  applyErrors(field: string){

    let error = this.form.get(field).errors;

    if(error.required){
      return this.validation_messages[field][0].message;
    }

    if(error.minlength){
      return this.validation_messages[field][1].message;
    }

   if(error.maxlength){
      return this.validation_messages[field][2].message;
    }

    return "Application Error: List errors this compoment not found!!";
  }
}
