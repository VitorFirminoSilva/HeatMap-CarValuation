import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CssHeatMapComponent } from './css-heat-map.component';

describe('CssHeatMapComponent', () => {
  let component: CssHeatMapComponent;
  let fixture: ComponentFixture<CssHeatMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CssHeatMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CssHeatMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
