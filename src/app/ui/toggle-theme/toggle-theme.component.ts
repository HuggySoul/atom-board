import { Component } from '@angular/core';
import { ToggleThemeService } from './toggle-theme.service';
import { AsyncPipe, NgClass } from '@angular/common';
import { Theme } from './toggle-theme.model';

@Component({
  selector: 'app-toggle-theme',
  standalone: true,
  imports: [AsyncPipe, NgClass],
  templateUrl: './toggle-theme.component.html',
  styleUrl: './toggle-theme.component.scss',
})
/**
 * Компонент для отображения переключателя темы
 */
export class ToggleThemeComponent {
  constructor(private themeToggleService: ToggleThemeService) {}

  toggle() {
    this.themeToggleService.toggleTheme();
  }

  get isLightTheme(): boolean {
    return this.themeToggleService.theme === Theme.LIGHT;
  }
}
