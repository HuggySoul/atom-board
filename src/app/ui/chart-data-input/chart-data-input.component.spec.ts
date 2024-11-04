import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartDataInputComponent } from './chart-data-input.component';

describe('ChartDataInputComponent', () => {
  let component: ChartDataInputComponent;
  let fixture: ComponentFixture<ChartDataInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChartDataInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChartDataInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
