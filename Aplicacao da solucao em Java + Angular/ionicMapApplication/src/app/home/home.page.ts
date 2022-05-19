import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { ViewCarComponent } from '../components/view-car/view-car.component';
import { AccessApiService } from '../services/access-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public carList = {} as any;
  public brandList = {} as any;

  constructor(  private modalController: ModalController, 
                private accessApi: AccessApiService,  
                private alertController: AlertController ) {
    this.getCarList();
    this.getBrandList();
  }

  ngOnInit() {
    
  }

  public async pushSelected(infoCar: any){
    this.modalViewCar(infoCar);
  }


  public async modalViewCar(infoCar: any) {
    const modal = await this.modalController.create({
      component:  ViewCarComponent,
      backdropDismiss: false,
      mode: "md",
      componentProps:{
        'modalController': this.modalController,
        'infoCar': infoCar,
      }
      
    });
    await modal.present();
    await modal.onDidDismiss().then(
      (dataReturn) => {
        //if(dataReturn.data.deleteCar)
          ///Enter Function
      }
    );
  }

  

  public async pushModify(mod: any){
    if(mod.event === "New_Brand" && mod.create){
      this.getBrandList();
    }
    if(mod.event === "New_Car" && mod.create){
      this.getCarList();
    }
  }

  private async getCarList() {
    await this.accessApi.getListCars().then(
      (data) =>{
        this.carList = data;
      }
    ); 
  } 

  private async getBrandList() {
    await this.accessApi.getListBrands().then(
      (data) =>{
        this.brandList = data;
      }
    ); 
  }


  async presentAlert(id: number) {
    const alert = await this.alertController.create({
      header: 'Delete Component in HeatMap',
      buttons: [ {
            text: 'Cancel',
            role: 'cancel',
            cssClass: 'secondary',
            id: 'cancel-button',
            }, {
                text: 'Delete',
                id: 'confirm-button',
                handler: async () => {
                    await this.accessApi.deleteCar(id);
                    await this.getCarList();
                }
            }
        ]
    });

    await alert.present();
  }
}

