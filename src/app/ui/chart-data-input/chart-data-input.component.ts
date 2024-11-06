import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { AppStateService } from '../../services/app-state/app-state.service';
import { TimePeriod } from '../../services/chart-time-period/time-period.model';
import { ChartType } from '../chart/chart.model';

@Component({
  selector: 'app-chart-data-input',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './chart-data-input.component.html',
  styleUrl: './chart-data-input.component.scss',
})
/**
 * Компонент для отображения полей ввода новых данных в график
 *
 * @param currentValue - текущее значение в графике
 * @param currentPeriod - текущий временной период
 * @param index - индекс изменяемого элемента в массиве значений
 * @param type - тип графика
 */
export class ChartDataInputComponent implements OnInit {
  @Input() currentValue!: number;
  @Input() currentPeriod!: TimePeriod;
  @Input() index!: number;
  @Input() type!: ChartType;

  public newDataValue!: FormControl;

  constructor(private appStateService: AppStateService) {}

  updateStorage() {
    if (this.newDataValue.value === this.currentValue) return;

    this.appStateService.setChartData(
      this.newDataValue.value,
      this.currentPeriod,
      this.index,
      this.type
    );
  }

  onkeydown(event: Event) {
    event.preventDefault();
    this.updateStorage();
  }

  ngOnInit(): void {
    this.newDataValue = new FormControl(this.currentValue);
  }
}
