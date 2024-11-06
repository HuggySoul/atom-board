import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration } from 'chart.js';
import { TimePeriod } from '../../services/chart-time-period/time-period.model';
import { TimePeriodService } from '../../services/chart-time-period/time-period.service';
import { takeUntil, Subject } from 'rxjs';
import { ChartData } from '../../api/chart-data';
import { TimePeriodBtnsComponent } from '../time-period-btns/time-period-btns.component';
import { EditChartMenuComponent } from '../edit-chart-menu/edit-chart-menu.component';
import { AppStateService } from '../../services/app-state/app-state.service';
import { ChartType } from './chart.model';
import { ToggleThemeService } from '../../services/theme-toggle/toggle-theme.service';
import { ChartConfigService } from '../../services/chart-config/chart-config.service';

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
    private timePeriodService: TimePeriodService,
    private themeToggleService: ToggleThemeService,
    private chartConfigService: ChartConfigService
  ) {}

  private updateChartConfig() {
    if (!this.chartData) return;

    this.chartConfig = this.chartConfigService.getChartConfig(
      this.currentTimePeriod,
      this.chartData,
      this.type
    );
  }

  ngOnInit() {
    // инициализация графика и создание подписки на изменение данных
    this.appStateService
      .getChartData(this.type)
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: ChartData | null) => {
        if (data) {
          this.chartData = data;
          this.updateChartConfig();
        }
      });

    // инициализация и подписка на изменение временного периода
    this.timePeriodService.timePeriod$
      .pipe(takeUntil(this.destroy$))
      .subscribe((period: TimePeriod) => {
        this.currentTimePeriod = period;
        this.updateChartConfig();
      });

    // инициализация и подписка на изменение темы
    this.themeToggleService.theme$
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.updateChartConfig();
      });
  }

  //отписка от всех подписок перед уничтожением компонента
  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
