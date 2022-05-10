import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoadingController, ToastController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

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
  id?:number;
  brand?: Brand;
  model?: string;
  fabricationYear?: Date;
  engineLiters?: number;
  fuel?: string;
  valuations?: {};
}

interface CarNotValuations{
  id?:number;
  brand?: Brand;
  model?: string;
  fabricationYear?: Date;
  engineLiters?: number;
  fuel?: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccessApiService {

  constructor(  private http: HttpClient ) { }

  public async getListCars() {
    return new Promise(resolve => {
      setTimeout(() => {
        this.http.get(`${environment.serverUrl}/cars`).subscribe(
          (data: any) => {     
            resolve(data);
          },
          (erro) =>{
            console.log(erro);
          }
        );
      }, 1000);
    });
  }

  public async getListBrands(){
    return new Promise(resolve => {
      setTimeout(() => {
        this.http.get(`${environment.serverUrl}/brands`).subscribe(
          (data: any) => {     
            resolve(data);
          },
          (erro) =>{
            console.log(erro);
          }
        );
      }, 1000);
    });
  }

  public async getBrand(id: number){
    return new Promise(resolve => {
      setTimeout(() => {
        this.http.get(`${environment.serverUrl}/brands/${id}`).subscribe(
          (data: any) => {     
            resolve(data);
          },
          (erro) =>{
            console.log(erro);
          }
        );
      }, 1000);
    });
  }

  public async createBrand(brand: Brand): Promise<void> {
    const url = `${environment.serverUrl}/brands`;
    this.http.post(url, brand).subscribe(
      (ok) => {
        console.log(ok);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  public async createCar(car: Car): Promise<void> { 
    const url = `${environment.serverUrl}/cars`;

    this.http
      .post<boolean>(url, car)
      .subscribe(
        (ok) => {
          console.log(ok);
        },
        (err) => {
          console.log(err);
        }
    );
  }

  public async createValuation(valuation: Valuation): Promise<void> {
    const url = `${environment.serverUrl}/valuations`;
    console.log(valuation.value);
    console.log(valuation);

    this.http.post(url, valuation).subscribe(
      (ok) => {
        console.log(ok);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  deleteCar(id: number){
    return new Promise(resolve => {
      setTimeout(() => {
        this.http.delete(`${environment.serverUrl}/cars/${id}`).subscribe(
          (data: any) => {     
            resolve(data);
          },
          (erro) =>{
            console.log(erro);
          }
        );
      }, 1000);
    });
  }

}
