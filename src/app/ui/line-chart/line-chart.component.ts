import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartConfiguration, ChartOptions } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { GetChartDataService } from '../../api/get-chart-data.service';
import { Labels } from '../../shared/labels.model';
import { TimePeriod } from '../../services/chart-time-period/time-period.model';
import { TimePeriodService } from '../../services/chart-time-period/time-period.service';
import { takeUntil, Subject } from 'rxjs';
import { ChartData } from '../../api/chart-data';
import { TimePeriodBtnsComponent } from '../time-period-btns/time-period-btns.component';

@Component({
  selector: 'app-line-chart',
  standalone: true,
  imports: [BaseChartDirective, TimePeriodBtnsComponent],
  templateUrl: './line-chart.component.html',
  styleUrl: './line-chart.component.scss',
  providers: [TimePeriodService],
})
export class LineChartComponent implements OnInit, OnDestroy {
  public TimePeriod = TimePeriod;
  private destroy$ = new Subject<void>(); // для отписки от подписок
  private chartData!: ChartData;

  //конфигурация графика
  public lineChartData!: ChartConfiguration<'line'>['data'];
  public lineChartLegend = true;
  public lineChartOptions: ChartOptions<'line'> = {
    responsive: false,
  };

  constructor(
    private getChartDataService: GetChartDataService,
    private timePeriodService: TimePeriodService
  ) {
    this.chartData = this.getChartDataService.getLineChartData();
  }

  private configureChart(period: TimePeriod) {
    this.lineChartData = {
      labels: Labels[period],
      datasets: [
        {
          data: this.chartData.data[period],
          label: '2024',
          fill: true,
          tension: 0.5,
          borderColor: 'black',
          borderWidth: 1.5,
          backgroundColor: 'rgba(255,0,0,0.3)',
        },
      ],
    };
  }

  ngOnInit() {
    this.configureChart(this.timePeriodService.period);

    this.timePeriodService.timePeriod$
      .pipe(takeUntil(this.destroy$))
      .subscribe((period: TimePeriod) => {
        this.configureChart(period);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
