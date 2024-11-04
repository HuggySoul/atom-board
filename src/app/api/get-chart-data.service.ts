import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class GetChartDataService {
  constructor() {}

  // Данные для линейного графика
  getLineChartData() {
    const chartData = {
      data: {
        hours: [
          112, 87, 101, 32, 125, 78, 143, 29, 91, 56, 118, 109, 13, 67, 12, 146,
          45, 103, 114, 137, 14, 98, 111, 100,
        ],
        days: [33, 100, 11, 66, 87, 123, 88],
        months: [65, 59, 80, 81, 56, 55, 40, 44, 76, 23, 32, 13],
      },
    };
    return of(chartData).pipe(delay(1000));
  }

  // Данные для кругового графика
  getPieChartData() {
    return {
      data: {
        hours: [
          112, 87, 101, 32, 125, 78, 143, 29, 91, 56, 118, 109, 13, 67, 12, 146,
          45, 103, 114, 137, 14, 98, 111,
        ],
        days: [33, 100, 11, 66, 87, 123, 88],
        months: [65, 59, 80, 81, 56, 55, 40, 44, 76, 23, 32, 13],
      },
    };
  }

  // Данные для столбчатого графика
  getBarChartData() {
    return {
      data: {
        hours: [
          112, 87, 101, 32, 125, 78, 143, 29, 91, 56, 118, 109, 13, 67, 12, 146,
          45, 103, 114, 137, 14, 98, 111,
        ],
        days: [33, 100, 11, 66, 87, 123, 88],
        months: [65, 59, 80, 81, 56, 55, 40, 44, 76, 23, 32, 13],
      },
    };
  }
}
