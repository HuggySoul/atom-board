import { Injectable } from '@angular/core';
import { ChartData } from '../../api/chart-data';
import { GetChartDataService } from '../../api/get-chart-data.service';
import { TimePeriod } from '../chart-time-period/time-period.model';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AppStateService {
  private lineChartData = new BehaviorSubject<ChartData | null>(null);
  lineChartData$: Observable<ChartData | null> =
    this.lineChartData.asObservable();

  constructor(private getChartDataService: GetChartDataService) {
    this.loadLineChartData();
  }

  private loadLineChartData() {
    this.getChartDataService.getLineChartData().subscribe((data) => {
      this.lineChartData.next(data);
    });
  }

  public setLineChartData(value: number, period: TimePeriod, index: number) {
    const chartData = this.lineChartData.value;
    if (chartData) {
      chartData.data[period][index] = value;
      this.lineChartData.next(chartData);
    }
  }

  public getLineChartData() {
    return this.lineChartData$;
  }

  public resetLineChartData() {
    this.loadLineChartData();
  }
}
