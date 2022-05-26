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
  @Input() public infoCar = {} as any;

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

    let data = await this.presentAlert();

    if(data){
      const loading = await this.loadingCtrl.create({
        message: "Delete Car...",
      });
      await this.accessApi.deleteCar(this.infoCar.id);
      await loading.dismiss();
      this.modalController.dismiss({
        'dismissed': true,
        'deleteCar': true,
      });
      
    }else{
      return;
    }
  }

  presentAlert():Promise<boolean> {
    return new Promise((resolve, reject) => {
      const ctl = this.alertCtrl;
      let alert: any = this.alertCtrl.create({
        header: 'Confirm Delete this Car!',
        message: 'Are you sure you want to <strong>delete<strong> this car information!!!',
        buttons: [
          {
            text: 'Cancel',
            role: 'cancel',
            id: 'cancel-button',
            handler: () => {
              ctl.dismiss().then(() => { resolve(false); });
            }
          }, {
            text: 'Okay',
            id: 'confirm-button',
            handler: () => {
              ctl.dismiss().then(() => { resolve(true); });
            }
          }
        ]
      }).then((dlg) => dlg.present());
    });
  }



}
