import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { Labels } from '../../shared/labels.model';
import { TimePeriod } from '../../services/chart-time-period/time-period.model';
import { TimePeriodService } from '../../services/chart-time-period/time-period.service';
import { takeUntil, Subject } from 'rxjs';
import { ChartData } from '../../api/chart-data';
import { TimePeriodBtnsComponent } from '../time-period-btns/time-period-btns.component';
import { EditChartMenuComponent } from '../edit-chart-menu/edit-chart-menu.component';
import { AppStateService } from '../../services/app-state/app-state.service';
import { ChartType } from './chart.model';
import { ChartColors } from '../../shared/chart-colors';

@Component({
  selector: 'app-chart',
  standalone: true,
  imports: [
    NgIf,
    BaseChartDirective,
    TimePeriodBtnsComponent,
    EditChartMenuComponent,
  ],
  templateUrl: './chart.component.html',
  styleUrl: './chart.component.scss',
  providers: [TimePeriodService],
})

/**
 * Универсальный компонент для отрисовки графиков разных типов
 * @param type - тип графика
 */
export class ChartComponent implements OnInit, OnDestroy {
  @Input() type!: ChartType;

  private destroy$ = new Subject<void>(); // для отписки от подписок
  public chartData!: ChartData;
  public currentTimePeriod!: TimePeriod; // для передачи дочерним компонентам

  public lineChartLegend = true;
  public chartConfig!: ChartConfiguration<ChartType>;

  constructor(
    private appStateService: AppStateService,
    private timePeriodService: TimePeriodService
  ) {}

  // формирование датасетов для графиков разных типов
  private getChartDataSet(
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
            backgroundColor: 'rgba(255,0,0,0.3)',
          },
        ];
      case ChartType.BAR:
        return [
          {
            data: chartData.data[period],
            label: '2024',
            borderColor: 'black',
            borderWidth: 1.5,
            backgroundColor: ChartColors,
          },
        ];
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

  // формирование конфигурации графика
  private configureChart(
    period: TimePeriod,
    chartData: ChartData | null,
    type: ChartType
  ) {
    if (!chartData) return;

    this.chartConfig = {
      type: type,
      data: {
        labels: Labels[period],
        datasets: this.getChartDataSet(period, chartData, type),
      },
      options: {
        responsive: false,
      },
    };
  }

  ngOnInit() {
    // инициализация графика и создание подписки на изменение данных
    this.appStateService
      .getChartData(this.type)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ChartData | null) => {
        if (data) {
          this.chartData = data;
          this.configureChart(this.timePeriodService.period, data, this.type);
        }
      });

    // инициализация и подписка на изменение временного периода
    this.timePeriodService.timePeriod$
      .pipe(takeUntil(this.destroy$))
      .subscribe((period: TimePeriod) => {
        this.currentTimePeriod = period;
        this.configureChart(period, this.chartData, this.type);
      });
  }

  //отписка от всех подписок перед уничтожением компонента
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
