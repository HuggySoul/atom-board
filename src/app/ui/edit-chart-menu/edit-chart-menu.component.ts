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
export class EditChartMenuComponent implements OnDestroy {
  isOpen = false;
  labels = Labels;
  @Input() currentPeriod!: TimePeriod;
  @Input() chartData!: ChartData;
  @Input() type!: ChartType;

  private escapeListener!: () => void;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  toggleMenu() {
    this.isOpen = !this.isOpen;

    if (this.isOpen) {
      this.addEscapeListener();
    } else {
      this.removeEscapeListener();
    }
  }

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

  @HostListener('document:click', ['$event.target'])
  onClickOutside(targetElement: HTMLElement) {
    if (this.isOpen && !this.elementRef.nativeElement.contains(targetElement)) {
      this.isOpen = false;
    }
  }

  ngOnDestroy(): void {
    this.removeEscapeListener();
  }
}
