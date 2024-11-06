import {
  Component,
  HostListener,
  ElementRef,
  Input,
  Renderer2,
  OnDestroy,
} from '@angular/core';
import { NgIf, NgFor } from '@angular/common';
import { TimePeriod } from '../../services/chart-time-period/time-period.model';
import { ChartData } from '../../api/chart-data';
import { Labels } from '../../shared/labels.model';
import { ChartDataInputComponent } from '../chart-data-input/chart-data-input.component';
import { ChartType } from '../chart/chart.model';

@Component({
  selector: 'app-edit-chart-menu',
  standalone: true,
  imports: [NgIf, NgFor, ChartDataInputComponent],
  templateUrl: './edit-chart-menu.component.html',
  styleUrl: './edit-chart-menu.component.scss',
})

/**
 * Компонент отображения всплывающего меню для редактирования графика
 *
 * @param currentPeriod - текущий временной период
 * @param chartData - набор данных в графике
 * @param type - типа графика
 */
export class EditChartMenuComponent implements OnDestroy {
  isOpen = false;
  labels = Labels;
  @Input() currentPeriod!: TimePeriod;
  @Input() chartData!: ChartData;
  @Input() type!: ChartType;

  private escapeListener!: () => void;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  //Логика открытия и закрытия меню
  toggleMenu() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.addEscapeListener();
    } else {
      this.removeEscapeListener();
    }
  }

  //Логика закрытия окна по нажатии Escape
  private addEscapeListener() {
    this.escapeListener = this.renderer.listen(
      this.elementRef.nativeElement,
      'keydown',
      (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          this.isOpen = false;
          this.removeEscapeListener();
        }
      }
    );
  }

  private removeEscapeListener() {
    if (this.escapeListener) {
      this.escapeListener();
    }
  }

  //логика закрытия меню при клике вне
  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: HTMLElement) {
    if (this.isOpen && !this.elementRef.nativeElement.contains(targetElement)) {
      this.isOpen = false;
    }
  }

  //удаление прослушивателя событий при уничтожении компонента
  ngOnDestroy(): void {
    this.removeEscapeListener();
  }
}
