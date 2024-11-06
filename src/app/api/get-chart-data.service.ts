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
    const chartData = {
      data: {
        hours: [
          99, 67, 133, 35, 130, 85, 145, 35, 95, 95, 11, 109, 13, 67, 12, 146,
          45, 153, 164, 237, 14, 98, 55,
        ],
        days: [33, 100, 11, 66, 87, 123, 88],
        months: [65, 59, 80, 81, 56, 55, 40, 44, 76, 23, 32, 13],
      },
    };
    return of(chartData).pipe(delay(1000));
  }

  // Данные для столбчатого графика
  getBarChartData() {
    const chartData = {
      data: {
        hours: [
          115, 90, 101, 32, 125, 78, 143, 29, 91, 56, 119, 109, 13, 67, 69, 149,
          63, 110, 123, 145, 24, 100, 133,
        ],
        days: [66, 234, 32, 74, 93, 133, 91],
        months: [65, 60, 80, 81, 56, 59, 40, 44, 77, 25, 44, 19],
      },
    };
    return of(chartData).pipe(delay(1000));
  }
}
