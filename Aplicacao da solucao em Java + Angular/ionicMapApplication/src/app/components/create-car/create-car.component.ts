import { Component, Input, OnInit} from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AccessApiService } from 'src/app/services/access-api.service';

interface Brand{
  id?: number;
  brandName?: string;
  description?: string;
}

interface Valuation{
  dateValuation?: Date;
  value?: number;
  car?: {};
}

interface Car{
  brand?: Brand;
  model?: string;
  fabricationYear?: Date;
  engineLiters?: number;
  fuel?: string;
  valuations?: {};
}

@Component({
  selector: 'app-create-car',
  templateUrl: './create-car.component.html',
  styleUrls: ['./create-car.component.scss'],
})
export class CreateCarComponent implements OnInit {

  public form: FormGroup;
  public cars = {} as any;

  @Input() modalController: ModalController;
  @Input() public brandList = [];

  constructor(  
                private formBuilder: FormBuilder, 
                public alertController: AlertController,
                public accessApi: AccessApiService, 
                private loadingCtrl: LoadingController 
              ) { 
    
  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      brandId: ['empty', Validators.required],
      model: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(60)]],
      fabricationYear: ['', Validators.required],
      engineLiters: ['', Validators.required],
      fuel: ['empty',  Validators.required],
      dateRef1: ['', Validators.required],
      value1:  ['', Validators.required],
      dateRef2: ['', Validators.required],
      value2:  ['', Validators.required],
    });
  }

  validation_messages = {
    'brandId': [
      { type: 'required', message: 'Brand is required.' },
    ],
    'model': [
      { type: 'required', message: 'Model is required.' },
      { type: 'minlength', message: 'Model must be at least 2 characters long.' },
      { type: 'maxlength', message: 'Model must have a maximum of 60 characters' }
    ],
    'fabricationYear': [
      { type: 'required', message: 'Fabrication Year is required.' },
    ],
    'engineLiters': [
      { type: 'required', message: 'Engine Liters is required.' },
    ],
    'fuel': [
      { type: 'required', message: 'Fuel is required.' },
    ],
    'dateRef1': [
      { type: 'required', message: 'Date Reference is required.' },
    ],
    'value1': [
      { type: 'required', message: 'Value is required.' },
    ],
    'dateRef2': [
      { type: 'required', message: 'Date Reference is required.' },
    ],
    'value2': [
      { type: 'required', message: 'Value is required.' },
    ],
  }

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true,
      'newCar': false,
    });
  }


  public async submitForm() {

    console.log(this.form);

    const loading = await this.loadingCtrl.create({
      message: "Creating...",
    });
    await loading.present();

    if(this.form.status === "INVALID"){
      this.presentAlert("Dados São Requeridos.", "ERRO");
      await loading.dismiss();
      return;
    }

    
    const val1: Valuation = {} as any;
    const val2: Valuation = {} as any;
   
    val1.dateValuation= this.form.value.dateRef1;
    val1.value = this.form.value.value1;
    val2.dateValuation = this.form.value.dateRef2;
    val2.value = this.form.value.value2;
   
  
    const car: Car = {} as any;
    car.brand = this.form.value.brandId;
    car.engineLiters = parseFloat(this.form.value.engineLiters);
    car.fabricationYear = this.form.value.fabricationYear;
    car.fuel = this.form.value.fuel;
    car.model = this.form.value.model;

    await this.accessApi.createCar(car);
    this.cars = await this.accessApi.getListCars();

    const carTemp = await this.cars.filter(element => { return  (element.model === car.model)}); 

    val1.car  = carTemp[0];
    val2.car  = carTemp[0];

    await this.accessApi.createValuation(val1);
    await this.accessApi.createValuation(val2);
    await loading.dismiss();
    this.modalController.dismiss({
      'dismissed': true,
      'newCar': true,
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

  compareWith(o1: Brand, o2: Brand) {
    return o1 && o2 ? o1.id === o2.id : o1 === o2;
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
