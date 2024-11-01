import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TimePeriod } from './time-period.model';

@Injectable()
export class TimePeriodService {
  private timePeriodSubject = new BehaviorSubject<TimePeriod>(TimePeriod.HOUR);
  public timePeriod$ = this.timePeriodSubject.asObservable();

  constructor() {}

  public setTimePeriod(period: TimePeriod) {
    this.timePeriodSubject.next(period);
  }

  get period(): TimePeriod {
    return this.timePeriodSubject.value;
  }
}
