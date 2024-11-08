import { Component } from '@angular/core';
import { ToggleThemeComponent } from '../toggle-theme/toggle-theme.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToggleThemeComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
/**
 * Компонент для отображения хедера приложения
 */
export class HeaderComponent {}
