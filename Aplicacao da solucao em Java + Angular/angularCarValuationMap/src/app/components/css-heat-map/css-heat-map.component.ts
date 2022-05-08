import { Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { AccessApiService } from 'src/app/services/access-api.service';

interface ValueCarChange {
    span: number;
    row: number;
    colorHSL: string;
    porcentage: number;
    idCar: number;
}

@Component({
    selector: 'app-css-heat-map',
    templateUrl: './css-heat-map.component.html',
    styleUrls: ['./css-heat-map.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class CssHeatMapComponent implements OnInit, OnChanges {

    public carList: any[] = [];
    public carValues: ValueCarChange[] = [];

    public size: string = 'large';

    constructor(private accessApi : AccessApiService) {
    }


    ngOnInit() {
        this.getCarList();
        this.changeValues();
    }

    ngOnChanges(){
        console.log(this.carList);
    }


    public draw() {
        const targetElement: HTMLElement = document.getElementById("mondrian-wrapper")!;
        const painting: string = `<div class="mondrian mondrian--${this.size}">${this.generateCells()}</div>`;
        targetElement.insertAdjacentHTML('beforeend', painting);
    }

    public redraw() {
        const element: HTMLElement = document.querySelector('.mondrian')!;
        element.parentNode!.removeChild(element);

        this.draw();
    }

    private generateCells() {
        let cells: string = ``;

        for (let i = 0; i < this.carValues.length; i++) {
            let idCar: number = this.carValues[i].idCar;
            let span: number = this.carValues[i].span;
            let row: number = this.carValues[i].row;
            let colorIndex: string = this.carValues[i].colorHSL;
            cells += `<div class="centerText span-${span} row-${row}" style="background-color:${colorIndex};">
                <p class="car">${this.carList[idCar].model}<br>${this.carValues[i].porcentage.toFixed(2)}</p>
            </div>`
        }

        return cells;
    }

    private orderASC(){
        this.carValues.sort((a,b) => a.porcentage > b.porcentage ? -1 : 1);
        this.redraw();
    }

    private orderDESC(){
        this.carValues.sort((a,b) => a.porcentage > b.porcentage ? 1 : -1);
        this.redraw();
    }

    private getCarList(){
        this.accessApi.getListCars().subscribe(
            (data: any) => {
                console.log(data);
                this.carList = data;
            },
            (erro) =>{
                console.log(erro);
            }
        ); 
    }

    private changeValues(){
        const promise = new Promise<void>((resolve, reject) => {
            setTimeout(() => {
                for (let i = 0; i < this.carList.length; i++) {
                    const element = this.carList[i];
                    const value = element.valuations[0].value;
                    const value2 = element.valuations[1].value;

                    const calc = value - value2;

                    this.carValues[i] = { "span": 0, "row": 0, "colorHSL": "", "porcentage": 0.0, "idCar": i };

                    if(value > 10000.0 && value <= 25000.0){
                        this.carValues[i].span = 2;
                    }
                    else if(value > 25000.0 && value <= 40000.0){
                        this.carValues[i].span = 3;
                    }
                    else if(value > 40000.0 && value <= 55000.0){
                        this.carValues[i].span = 4;
                    }
                    else if(value > 55000.0){
                        this.carValues[i].span = 5;
                    }
                    else{
                        this.carValues[i].span = 1; 
                    }

                    if(calc > 1000.0 && calc <= 2500.0){
                        this.carValues[i].row = 2;
                    }
                    else if(calc > 2500.0 && calc <= 4000.0){
                        this.carValues[i].row = 3;
                    }
                    else if(calc > 4000.0 && calc <= 5500.0){
                        this.carValues[i].row = 4;
                    }
                    else if(calc > 5500.0){
                        this.carValues[i].row = 5;
                    }
                    else{
                        this.carValues[i].row = 1 ; 
                    } 
                    
                    const temp = ((value - value2) / value2) * 100;
                    this.carValues[i].porcentage = temp;
                    let brt = 50;
                    const tempAbs = Math.abs(temp);

                    if(tempAbs > 20.0){
                        brt = 45  ;
                    }
                    else if(tempAbs < 15){
                        brt = 60;
                    }
                    else if(tempAbs < 10){
                        brt = 70
                    }
                    else if(tempAbs < 5){
                        brt = 80;
                    }
                    else{
                        brt = 100;
                    }

                    if(value > value2){
                        this.carValues[i].colorHSL = `hsl(100, 100%, ${brt}%)`;
                    }
                    else{
                        this.carValues[i].colorHSL = `hsl(1, 100%, ${brt}%)`;
                    }
                }
                this.draw();
            }, 1500);
            
          });
        return promise;
    }
    
}