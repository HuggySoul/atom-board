import { Injectable } from '@angular/core';
import { ChartData } from '../../api/chart-data';
import { GetChartDataService } from '../../api/get-chart-data.service';
import { TimePeriod } from '../chart-time-period/time-period.model';
import { BehaviorSubject, Observable } from 'rxjs';
import { ChartType } from '../../ui/chart/chart.model';

@Injectable({
  providedIn: 'root',
})

/**
 * Сервис хранения глобального состояния всех графиков
 *
 * @ВНИМАНИЕ Сервис является глобальным:
 * не подразумевает использование нескольких графиков одинакового типа в одном приложении,
 * так как состояние графиков одинаковых типов будет идентичным (providedIn: 'root').
 */
export class AppStateService {
  private lineChartData = new BehaviorSubject<ChartData | null>(null);
  private lineChartData$: Observable<ChartData | null> =
    this.lineChartData.asObservable();

  private barChartData = new BehaviorSubject<ChartData | null>(null);
  barChartData$: Observable<ChartData | null> =
    this.barChartData.asObservable();

  private pieChartData = new BehaviorSubject<ChartData | null>(null);
  pieChartData$: Observable<ChartData | null> =
    this.pieChartData.asObservable();

  constructor(private getChartDataService: GetChartDataService) {
    this.LoadChartData(ChartType.LINE);
    this.LoadChartData(ChartType.BAR);
    this.LoadChartData(ChartType.PIE);
  }

  // Загрузка данных с сервера
  private LoadChartData(type: ChartType) {
    switch (type) {
      case ChartType.LINE:
        this.getChartDataService.getLineChartData().subscribe((data) => {
          this.lineChartData.next(data);
        });
        break;
      case ChartType.BAR:
        this.getChartDataService.getBarChartData().subscribe((data) => {
          this.barChartData.next(data);
        });
        break;
      case ChartType.PIE:
        this.getChartDataService.getPieChartData().subscribe((data) => {
          this.pieChartData.next(data);
        });
        break;
    }
  }

  // Изменение данных в графике соответствующего типа
  public setChartData(
    value: number, // новое значение
    period: TimePeriod,
    index: number, // индекс изменяемого элемента
    type: ChartType
  ) {
    switch (type) {
      case ChartType.LINE: {
        const chartData = this.lineChartData.value;
        if (chartData) {
          chartData.data[period][index] = value;
          this.lineChartData.next(chartData);
        }
        break;
      }
      case ChartType.BAR: {
        const chartData = this.barChartData.value;
        if (chartData) {
          chartData.data[period][index] = value;
          this.barChartData.next(chartData);
        }
        break;
      }
      case ChartType.PIE: {
        const chartData = this.pieChartData.value;
        if (chartData) {
          chartData.data[period][index] = value;
          this.pieChartData.next(chartData);
        }
        break;
      }
    }
  }

  // Получение данных для графика соответствующего типа
  public getChartData(type: ChartType) {
    switch (type) {
      case ChartType.LINE:
        return this.lineChartData$;
      case ChartType.BAR:
        return this.barChartData$;
      case ChartType.PIE:
        return this.pieChartData$;
    }
  }

  // Сброс данных для графика соответствующего типа
  public ResetChartData(type: ChartType) {
    switch (type) {
      case ChartType.LINE:
        this.LoadChartData(ChartType.LINE);
        break;
      case ChartType.BAR:
        this.LoadChartData(ChartType.BAR);
        break;
      case ChartType.PIE:
        this.LoadChartData(ChartType.PIE);
        break;
    }
  }
}
