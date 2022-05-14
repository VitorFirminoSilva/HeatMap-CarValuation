import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { AccessApiService } from '../services/access-api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  public carList = {} as any;

  constructor(  private accessApi: AccessApiService, private alertController: AlertController ) {
    this.getCarList();
  }

  ngOnInit() {
    
  }

  public async pushSelected(event: any){
    console.log(event);
    //await this.presentAlert(event.id);
  }

  private async getCarList() {
    await this.accessApi.getListCars().then(
      (data) =>{
        this.carList = data;
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

