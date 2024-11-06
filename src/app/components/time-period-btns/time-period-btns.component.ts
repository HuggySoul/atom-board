import { Component } from '@angular/core';
import { TimePeriod } from '../../services/chart-time-period/time-period.model';
import { TimePeriodService } from '../../services/chart-time-period/time-period.service';
import { NgClass } from '@angular/common';
@Component({
  selector: 'app-time-period-btns',
  standalone: true,
  imports: [NgClass],
  templateUrl: './time-period-btns.component.html',
  styleUrl: './time-period-btns.component.scss',
})

/**
 * Компонент отображения кнопок выбора временного периода на графике
 *
 */
export class TimePeriodBtnsComponent {
  public TimePeriod = TimePeriod;

  constructor(private timePeriodService: TimePeriodService) {}

  public changePeriod(period: TimePeriod) {
    this.timePeriodService.setTimePeriod(period);
  }

  public isCurrentPeriod(period: TimePeriod) {
    return this.timePeriodService.period === period;
  }
}
