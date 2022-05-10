import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AccessApiService } from 'src/app/services/access-api.service';
import { CreateBrandComponent } from '../create-brand/create-brand.component';
import { CreateCarComponent } from '../create-car/create-car.component';

@Component({
  selector: 'app-menubar',
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss'],
})
export class MenubarComponent implements OnInit {

  private brands = {} as any;

  constructor(private modalController: ModalController, private accessApi: AccessApiService) { }

  ngOnInit() {}

  create_brand(){
    this.modalBrand();
  }

  create_car(){
    this.modalCar();
  }

  private async getBrands(){
    this.brands = await this.accessApi.getListBrands(); 
  }

  public async modalBrand() {
    const modal = await this.modalController.create({
      component: CreateBrandComponent,
      backdropDismiss: false,
      mode: "md",
      componentProps:{
        'modalController': this.modalController,
      }
      
    })
    await modal.present();
  }

  public async modalCar() {
    const modal = await this.modalController.create({
      component: CreateCarComponent,
      backdropDismiss: false,
      mode: "md",
      componentProps:{
        'modalController': this.modalController,
        'brandList': this.brands,
      }
      
    })
    await modal.present();
  }

}
