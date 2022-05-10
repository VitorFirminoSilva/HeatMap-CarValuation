import { animate, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
    trigger('overlay', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('150ms', style({ opacity: .5 })),
        ]),
        transition(':leave', [
          animate('300ms', style({ opacity: 0 }))
        ])
      ]),
      
      trigger('modal', [
        transition(':enter', [
          style({ top: -999 }),
          animate('300ms', style({ top: '50%' })),
        ]),
        transition(':leave', [
          animate('150ms', style({ top: -999 }))
        ])
      ]),
    ]
})
export class ModalComponent{

  @Input() title: string = "Modal Title";

  public show: boolean = false;

  constructor() { }

  toggle(){
    this.show = !this.show;
  }

}
