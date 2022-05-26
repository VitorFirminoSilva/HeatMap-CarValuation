import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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

  @Input() brandList = [];
  @Output() eventEmitter = new EventEmitter<any>();

  constructor( private modalController: ModalController ) { }

  ngOnInit() {}
  

  create_brand(){
    this.modalBrand();
  }

  create_car(){
    this.modalCar();
  }

  public async modalBrand() {
    const modal = await this.modalController.create({
      component: CreateBrandComponent,
      backdropDismiss: false,
      mode: "md",
      componentProps:{
        'modalController': this.modalController,
      }
      
    });
    await modal.present();
    await modal.onDidDismiss().then(
      (data) => {
        if(data.data.newBrand)
          this.eventEmitter.emit({"event": "New_Brand", "create": true});
      }
    );
  }

  public async modalCar() {
    const modal = await this.modalController.create({
      component: CreateCarComponent,
      backdropDismiss: false,
      mode: "md",
      componentProps:{
        'modalController': this.modalController,
        'brandList': this.brandList,
      }
      
    });
    await modal.present(); 
    await modal.onDidDismiss().then(
      (data) => {
        if(data.data.newCar)
          this.eventEmitter.emit({"event": "New_Car", "create": true});
      }
    );
  }

}
