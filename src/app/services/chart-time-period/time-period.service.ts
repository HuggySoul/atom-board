import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimePeriod } from './time-period.model';

@Injectable()

/**
 * Сервис для работы с состоянием временного периода графика
 *
 * Подразумевает использование отдельного экземпляра сервиса для каждого типа графика
 */
export class TimePeriodService {
  private timePeriodSubject = new BehaviorSubject<TimePeriod>(TimePeriod.HOUR);
  public timePeriod$ = this.timePeriodSubject.asObservable();

  constructor() {}

  //изменение текущего временного периода
  public setTimePeriod(period: TimePeriod) {
    this.timePeriodSubject.next(period);
  }

  //получение текущего временного периода
  get period(): TimePeriod {
    return this.timePeriodSubject.value;
  }
}
