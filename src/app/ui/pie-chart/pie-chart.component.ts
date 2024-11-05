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
  selector: 'app-pie-chart',
  standalone: true,
  imports: [
    EditChartMenuComponent,
    TimePeriodBtnsComponent,
    NgIf,
    BaseChartDirective,
  ],
  templateUrl: './pie-chart.component.html',
  styleUrl: './pie-chart.component.scss',
  providers: [TimePeriodService],
})
export class PieChartComponent implements OnInit, OnDestroy {
  public TimePeriod = TimePeriod;
  private destroy$ = new Subject<void>(); // для отписки от подписок
  public chartData!: ChartData;
  public currentTimePeriod!: TimePeriod;

  //конфигурация графика
  public lineChartData!: ChartConfiguration<'pie'>['data'];
  public lineChartLegend = true;
  public lineChartOptions: ChartOptions<'pie'> = {
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
          backgroundColor: [
            'rgb(255, 99, 132)', // Red
            'rgb(54, 162, 235)', // Blue
            'rgb(255, 205, 86)', // Yellow
            'rgb(75, 192, 192)', // Teal
            'rgb(153, 102, 255)', // Purple
            'rgb(255, 159, 64)', // Orange
            'rgb(201, 203, 207)', // Light Gray
            'rgb(255, 180, 0)', // Amber
            'rgb(34, 202, 236)', // Cyan
            'rgb(102, 255, 153)', // Light Green
            'rgb(255, 140, 0)', // Dark Orange
            'rgb(220, 20, 60)', // Crimson
            'rgb(72, 61, 139)', // Dark Slate Blue
            'rgb(124, 252, 0)', // Lawn Green
            'rgb(255, 105, 180)', // Hot Pink
            'rgb(70, 130, 180)', // Steel Blue
            'rgb(210, 105, 30)', // Chocolate
            'rgb(176, 224, 230)', // Powder Blue
            'rgb(46, 139, 87)', // Sea Green
            'rgb(123, 104, 238)', // Medium Slate Blue
            'rgb(250, 128, 114)', // Salmon
            'rgb(244, 164, 96)', // Sandy Brown
            'rgb(112, 128, 144)', // Slate Gray
            'rgb(0, 128, 128)', // Teal
          ],
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
