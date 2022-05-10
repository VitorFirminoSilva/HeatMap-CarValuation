import { Component, Input, OnInit } from '@angular/core';
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

interface CarNotValuations{
  brand?: Brand;
  model?: string;
  fabricationYear?: Date;
  engineLiters?: number;
  fuel?: string;
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
  @Input() brandList: any[];

  constructor(  private formBuilder: FormBuilder, 
                public alertController: AlertController,
                public accessApi: AccessApiService, private loadingCtrl: LoadingController ) { 
    this.form = this.formBuilder.group({

      model: new FormControl('', Validators.required),
      fabricationYear: new FormControl('', Validators.required),
      engineLiters: new FormControl('', Validators.required),
      dateRef1: new FormControl('', Validators.required),
      value1:  new FormControl('', Validators.required),
      dateRef2: new FormControl('', Validators.required),
      value2:  new FormControl('', Validators.required),
    });
  }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true
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
      return;
    }
    const val1: Valuation = {} as any;
    const val2: Valuation = {} as any;

   
    val1.dateValuation= this.form.value.dateRef1;
    val1.value = this.form.value.value1;
    val2.dateValuation = this.form.value.dateRef2;
    val2.value = this.form.value.value2;
   
  
    const car: Car = {} as any;
    car.brand = {"id": 2, "brandName": "Honda", "description": "Montadora japonesa"};
    car.engineLiters = this.form.value.engineLiters;
    car.fabricationYear = this.form.value.fabricationYear;
    car.fuel = "GASOLINE";
    car.model = this.form.value.model;

    await this.accessApi.createCar(car);
    this.cars = await this.accessApi.getListCars();

    console.log(this.cars);
    const carTemp: CarNotValuations = await this.cars.filter(element => { return  (element.model === car.model)}); 


    console.log(carTemp);
    val1.car  = carTemp[0];
    val2.car  = carTemp[0];

    console.log(val1);
    console.log(val2);
    await this.accessApi.createValuation(val1);
    await this.accessApi.createValuation(val2);

    await loading.dismiss();
    this.dismissModal();
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
