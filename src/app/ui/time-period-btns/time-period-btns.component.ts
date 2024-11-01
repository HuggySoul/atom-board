import { Component } from '@angular/core';
import { TimePeriod } from '../../services/chart-time-period/time-period.model';
import { TimePeriodService } from '../../services/chart-time-period/time-period.service';
@Component({
  selector: 'app-time-period-btns',
  standalone: true,
  imports: [],
  templateUrl: './time-period-btns.component.html',
  styleUrl: './time-period-btns.component.scss',
})
export class TimePeriodBtnsComponent {
  public TimePeriod = TimePeriod;

  constructor(private timePeriodService: TimePeriodService) {}

  public changePeriod(period: TimePeriod) {
    this.timePeriodService.setTimePeriod(period);
  }
}
