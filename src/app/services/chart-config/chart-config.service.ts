import { Injectable } from '@angular/core';
import { ToggleThemeService } from '../theme-toggle/toggle-theme.service';
import { Theme } from '../theme-toggle/toggle-theme.model';
import { ChartConfiguration } from 'chart.js';
import { Labels } from '../../shared/labels.model';
import { TimePeriod } from '../../services/chart-time-period/time-period.model';
import { ChartData } from '../../api/chart-data';
import { ChartColors } from '../../shared/chart-colors';
import { ChartType } from '../../components/chart/chart.model';

@Injectable({
  providedIn: 'root',
})

/**
 * Сервис для настройки конфигурации графика
 *
 */
export class ChartConfigService {
  constructor(private themeToggleService: ToggleThemeService) {}

  //формирование датасетов для графиков разных типов
  private getDataset(
    period: TimePeriod,
    chartData: ChartData,
    type: ChartType
  ) {
    switch (type) {
      case ChartType.LINE:
        return [
          {
            data: chartData.data[period],
            label: '2024',
            fill: true,
            tension: 0.5,
            borderColor: 'black',
            borderWidth: 1.5,
            backgroundColor: 'rgba(255,0,0,0.6)',
          },
        ];
      case ChartType.BAR:
      case ChartType.PIE:
        return [
          {
            data: chartData.data[period],
            label: '2024',
            borderColor: 'black',
            borderWidth: 1.5,
            backgroundColor: ChartColors,
          },
        ];
    }
  }

  private getGridColor(): string {
    return this.themeToggleService.theme === Theme.DARK
      ? 'rgba(255,255,255,0.4)'
      : 'rgba(0,0,0,0.4)';
  }

  private getLabelColor(): string {
    return this.themeToggleService.theme === Theme.DARK ? 'white' : 'black';
  }

  //формирование опций графика в зависимости от типа
  private setChartOption(type: ChartType) {
    const gridColor = this.getGridColor();
    const labelColor = this.getLabelColor();

    switch (type) {
      case ChartType.BAR:
      case ChartType.LINE:
        return {
          responsive: false,
          scales: {
            x: { ticks: { color: labelColor }, grid: { color: gridColor } },
            y: { ticks: { color: labelColor }, grid: { color: gridColor } },
          },
          plugins: {
            legend: { labels: { color: labelColor } },
          },
        };
      case ChartType.PIE:
        return {
          responsive: false,
          plugins: {
            legend: { labels: { color: labelColor } },
          },
        };
    }
  }

  public getChartConfig(
    period: TimePeriod,
    chartData: ChartData,
    type: ChartType
  ): ChartConfiguration<ChartType> {
    return {
      type: type,
      data: {
        labels: Labels[period],
        datasets: this.getDataset(period, chartData, type),
      },
      options: this.setChartOption(type),
    };
  }
}
