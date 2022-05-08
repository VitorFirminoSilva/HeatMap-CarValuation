import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from "src/environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AccessApiService {

  constructor(private http: HttpClient) { }

  getListCars(){
    return this.http.get(`${environment.serverUrl}/cars?_embed=valuations`);
  }

}