import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditChartMenuComponent } from './edit-chart-menu.component';

describe('EditChartMenuComponent', () => {
  let component: EditChartMenuComponent;
  let fixture: ComponentFixture<EditChartMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditChartMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditChartMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
