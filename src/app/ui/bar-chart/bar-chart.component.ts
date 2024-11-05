import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { Labels } from '../../shared/labels.model';
import { TimePeriod } from '../../services/chart-time-period/time-period.model';
import { TimePeriodService } from '../../services/chart-time-period/time-period.service';
import { takeUntil, Subject } from 'rxjs';
import { ChartData } from '../../api/chart-data';
import { TimePeriodBtnsComponent } from '../time-period-btns/time-period-btns.component';
import { EditChartMenuComponent } from '../edit-chart-menu/edit-chart-menu.component';
import { AppStateService } from '../../services/app-state/app-state.service';

@Component({
  selector: 'app-bar-chart',
  standalone: true,
  imports: [
    NgIf,
    BaseChartDirective,
    TimePeriodBtnsComponent,
    EditChartMenuComponent,
  ],
  templateUrl: './bar-chart.component.html',
  styleUrl: './bar-chart.component.scss',
  providers: [TimePeriodService],
})
export class BarChartComponent implements OnInit, OnDestroy {
  public TimePeriod = TimePeriod;
  private destroy$ = new Subject<void>(); // для отписки от подписок
  public chartData!: ChartData;
  public currentTimePeriod!: TimePeriod;

  //конфигурация графика
  public lineChartData!: ChartConfiguration<'bar'>['data'];
  public lineChartLegend = true;
  public lineChartOptions: ChartOptions<'bar'> = {
    responsive: false,
  };

  constructor(
    private appStateService: AppStateService,
    private timePeriodService: TimePeriodService
  ) {}

  private configureChart(period: TimePeriod, chartData: ChartData | null) {
    if (!chartData) return;

    this.lineChartData = {
      labels: Labels[period],
      datasets: [
        {
          data: chartData.data[period],
          label: '2024',
          borderColor: 'black',
          borderWidth: 1.5,
          backgroundColor: 'rgba(255,0,0,0.3)',
        },
      ],
    };
  }

  ngOnInit() {
    this.appStateService.barChartData$
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ChartData | null) => {
        if (data) {
          this.chartData = data;
          this.configureChart(this.timePeriodService.period, this.chartData);
        }
      });

    this.timePeriodService.timePeriod$
      .pipe(takeUntil(this.destroy$))
      .subscribe((period: TimePeriod) => {
        this.currentTimePeriod = period;
        this.configureChart(period, this.chartData);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
