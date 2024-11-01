import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePeriodBtnsComponent } from './time-period-btns.component';

describe('TimePeriodBtnsComponent', () => {
  let component: TimePeriodBtnsComponent;
  let fixture: ComponentFixture<TimePeriodBtnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TimePeriodBtnsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TimePeriodBtnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
