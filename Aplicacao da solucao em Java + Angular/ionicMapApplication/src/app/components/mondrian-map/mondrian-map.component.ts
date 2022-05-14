import { HttpClient, HttpHandler } from '@angular/common/http';
import { Component, Injectable, Input, OnChanges, OnInit, Output, SimpleChanges, ViewEncapsulation, EventEmitter } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertController, LoadingController } from '@ionic/angular';
import { AccessApiService } from 'src/app/services/access-api.service';

interface ValueCarChange {
    span: number;
    row: number;
    colorHSL: string;
    porcentage: number;
    ident: number;
}

@Component({
    selector: 'app-mondrian-map',
    templateUrl: './mondrian-map.component.html',
    styleUrls: ['./mondrian-map.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MondrianMapComponent implements OnInit, OnChanges {

    @Input() public carList = [];
    @Output() eventEmitter = new EventEmitter<any>();
    
    public carValues: ValueCarChange[] = [];

    constructor(private loadingCtrl: LoadingController, 
                private alertController: AlertController,
            ) {
    }

    ngOnInit() {
        this.carValues = [];
        this.getCarGenerateList();
    }


    ngOnChanges(changes: SimpleChanges): void {
        this.ngOnInit();
    }

    public filterCarValues(){
        return this.carValues.filter(car =>  car.ident != -1);
    }

    public async clickHandler(id: number){
        this.eventEmitter.emit(this.carList[id]);
    }

    private async getCarGenerateList() {
        if(this.carList.length > 0){
            const loading = await this.loadingCtrl.create({
                message: "Generate Values...",
            });

            await loading.present();
        
            let i: number = 0;

            this.carList.forEach(() => {
                this.carValues[i] = { "span": 0, "row": 0, "colorHSL": "", "porcentage": 0.0, "ident": -1 };
                i++;
            })
            await this.changeValues();
            loading.dismiss();
        }
    }

    private async changeValues() {
        if (this.carList.length > 0) {
            for (let i = 0; i < this.carList.length; i++) {
                if (this.carList[i].valuations.length > 0) {
                    const element = this.carList[i];
                    const value = element.valuations[0].value;
                    const value2 = element.valuations[1].value;

                    const calc = value - value2;
                    this.carValues[i].ident = i;

                    if (value > 10000.0 && value <= 25000.0) {
                        this.carValues[i].span = 2;
                    }
                    else if (value > 25000.0 && value <= 40000.0) {
                        this.carValues[i].span = 3;
                    }
                    else if (value > 40000.0 && value <= 55000.0) {
                        this.carValues[i].span = 4;
                    }
                    else if (value > 55000.0) {
                        this.carValues[i].span = 5;
                    }
                    else {
                        this.carValues[i].span = 1;
                    }

                    if (calc > 1000.0 && calc <= 2500.0) {
                        this.carValues[i].row = 2;
                    }
                    else if (calc > 2500.0 && calc <= 4000.0) {
                        this.carValues[i].row = 3;
                    }
                    else if (calc > 4000.0 && calc <= 5500.0) {
                        this.carValues[i].row = 4;
                    }
                    else if (calc > 5500.0) {
                        this.carValues[i].row = 5;
                    }
                    else {
                        this.carValues[i].row = 1;
                    }

                    const temp = ((value - value2) / value2) * 100;
                    this.carValues[i].porcentage = temp;
                    let brt = 50;
                    const tempAbs = Math.abs(temp);

                    if (tempAbs >= 20.0) {
                        brt = 45;
                    }
                    else if (tempAbs >= 15.0 && tempAbs < 20.0) {
                        brt = 60;
                    }
                    else if (tempAbs >= 10.0 && tempAbs < 15.0) {
                        brt = 70
                    }
                    else if (tempAbs >= 5.0 && tempAbs < 10.0) {
                        brt = 80;
                    }
                    else if (tempAbs == 0) {
                        brt = 100;
                    }
                    else {
                        brt = 87;
                    }

                    if (value > value2) {
                        this.carValues[i].colorHSL = `hsl(100, 100%, ${brt}%)`;
                    }
                    else {
                        this.carValues[i].colorHSL = `hsl(1, 100%, ${brt}%)`;
                    }
                }
            }
        }
    }
}
