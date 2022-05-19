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
                private loadingCtrl: LoadingController ) { 
    this.form = this.formBuilder.group({
      brandName: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required),
    })
  }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true,
      'newBrand': false,
    });
  }

  public async submitForm() {

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



}
