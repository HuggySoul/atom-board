import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppStateService } from '../../services/app-state/app-state.service';
import { TimePeriod } from '../../services/chart-time-period/time-period.model';
@Component({
  selector: 'app-chart-data-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chart-data-input.component.html',
  styleUrl: './chart-data-input.component.scss',
})
export class ChartDataInputComponent implements OnInit {
  @Input() currentValue!: number;
  @Input() currentPeriod!: TimePeriod;
  @Input() index!: number;

  public newDataValue!: FormControl;

  constructor(private appStateService: AppStateService) {}

  updateStorage() {
    if (this.newDataValue.value === this.currentValue) return;

    this.appStateService.setLineChartData(
      this.newDataValue.value,
      this.currentPeriod,
      this.index
    );
  }

  onkeydown(event: Event) {
    event.preventDefault();
    this.updateStorage();
  }

  ngOnInit(): void {
    this.newDataValue = new FormControl(this.currentValue);
  }
}
