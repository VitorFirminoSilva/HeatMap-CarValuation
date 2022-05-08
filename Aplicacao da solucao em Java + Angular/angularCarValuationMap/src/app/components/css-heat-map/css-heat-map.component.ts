import { Component, OnChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { AccessApiService } from 'src/app/services/access-api.service';

interface ValueCarChange {
    span: number;
    row: number;
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
    public theme: string = 'default';
    private sizes: Array<string> = ['small', 'medium', 'large'];
    private themes: Array<{ name: string, colors: Array<string> }> = [
        {
            name: 'default',
            colors: [
                'black',
                'red',
                'blue',
                'yellow',
                'white',
                'white',
                'white'
            ]
        },
        {
            name: 'blue',
            colors: [
                'black',
                'blue',
                'blue',
                'white',
                'white',
                'white',
                'white',
                'white'
            ]
        },
    ];

    /**
     * Initialize a mondrian.
     */
    constructor(private accessApi : AccessApiService) {
    }


    ngOnInit() {
        this.getCarList();
        this.changeValues();
    }

    ngOnChanges(){
        console.log(this.carList);
    }

    ngAfterContentInit(){
        
    }

    ngAfterViewChecked(){
       
    }

    ngAfterViewInit() {
        
    }

    /**
     * Create a mondrian in targetElement.
     */
    public draw() {
        const targetElement: HTMLElement = document.getElementById("mondrian-wrapper")!;
        const painting: string = `<div class="mondrian mondrian--${this.size}">${this.generateCells()}</div>`;

        targetElement.insertAdjacentHTML('beforeend', painting);
    }

    /**
     * Remove the mondrian and create a new one.
     */
    public redraw() {
        const element: HTMLElement = document.querySelector('.mondrian')!;
        element.parentNode!.removeChild(element);

        this.draw();
    }

    /**
     * Set size option
     */
    public setSize(size: string) {
        if (this.sizes.includes(size)) {
            this.size = size;
        }
    }

    /**
     * Set theme option
     */
    public setTheme(theme: string) {
        if (this.themes.some(obj => obj.name === theme)) {
            this.theme = theme;
        }
    }

    /**
     * Generate the colored dom elements for the Mondrian based on the theme colors.
     */
    private generateCells() {
        let cells: string = ``;
        const selectedTheme: { name: string, colors: Array<string> } = this.themes.find(obj => obj.name === this.theme)!;
        for (let i = 0; i < this.carValues.length; i++) {
            let span: number = this.carValues[i].span;
            let row: number = this.carValues[i].row;
            let colorIndex: number = this.randInt(1, selectedTheme.colors.length);
            cells += `<div class="span-${span} row-${row} color-${selectedTheme.colors[colorIndex]}"></div>`
        }

        return cells;
    }

    /**
     * Get random int
     */
    private randInt(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min) + min);
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
                let i: number = 0;
                console.log("Entrei");
                for (let i = 0; i < this.carList.length; i++) {
                    const element = this.carList[i];
                    const value = element.valuations[0].value;
                    const value2 = element.valuations[1].value;

                    const calc = value - value2;

                    console.log(calc);

                    if(value > 10000.0 && value <= 25000.0){
                        this.carValues[i] = { "span": 2, "row": 0};
                    }
                    else if(value > 25000.0 && value <= 40000.0){
                        this.carValues[i] = { "span": 3, "row": 0};
                    }
                    else if(value > 40000.0 && value <= 55000.0){
                        this.carValues[i] = { "span": 4, "row": 0};
                    }
                    else if(value > 55000.0){
                        this.carValues[i] = { "span": 5, "row": 0};
                    }
                    else{
                        this.carValues[i] = { "span": 1, "row": 0}; 
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
                }

                console.log(this.carValues);
                this.draw();
            }, 1500);
            
          });
        return promise;
    }
    
}