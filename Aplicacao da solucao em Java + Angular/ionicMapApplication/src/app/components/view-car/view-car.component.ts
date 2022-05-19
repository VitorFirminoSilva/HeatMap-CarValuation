import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { AccessApiService } from 'src/app/services/access-api.service';

@Component({
  selector: 'app-view-car',
  templateUrl: './view-car.component.html',
  styleUrls: ['./view-car.component.scss'],
})
export class ViewCarComponent implements OnInit {

  @Input() modalController: ModalController;
  @Input() public infoCar = {};

  constructor(  private accessApi: AccessApiService, 
                private loadingCtrl: LoadingController,
                private alertCtrl: AlertController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalController.dismiss({
      'dismissed': true,
      'deleteCar': false,
    });
  }

  public async deleteCar() {

    const data = await this.presentAlertConfirm();

    console.log(data);

    /*
    const loading = await this.loadingCtrl.create({
      message: "Delete Car...",
    });
    await this.accessApi.deleteCar(100);
    await loading.dismiss();
    this.modalController.dismiss({
      'dismissed': true,
      'newCar': true,
    });
    */
  }


  async presentAlertConfirm(){
    const alert = await this.alertCtrl.create({
      header: 'Confirm Delete this Car!',
      message: 'Are you sure you want to <strong>delete<strong> this car information!!!',
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          id: 'cancel-button',
          handler: () => {
            return false;
          }
        }, {
          text: 'Okay',
          id: 'confirm-button',
          handler: () => {
            return true;
          }
        }
      ]
    });

    const data = await alert.present();
    return data;
  }



}
