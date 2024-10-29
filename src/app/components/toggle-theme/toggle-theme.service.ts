import { Inject, Injectable } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { BehaviorSubject } from 'rxjs';
import { Theme } from './toggle-theme.model';

@Injectable({ providedIn: 'root' })
export class ToggleThemeService {
  private themeSubject = new BehaviorSubject<Theme>(Theme.LIGHT);

  constructor(@Inject(DOCUMENT) private document: Document) {
    this.initTheme();
  }

  // Переключение темы
  toggleTheme() {
    const newTheme =
      this.themeSubject.value === Theme.LIGHT ? Theme.DARK : Theme.LIGHT;
    this.setTheme(newTheme);
  }

  // Устанавливаем новую тему
  private setTheme(theme: Theme) {
    this.document.body.classList.remove(this.themeSubject.value);
    this.document.body.classList.add(theme);

    this.themeSubject.next(theme);
    localStorage.setItem('theme', theme);
  }

  private initTheme() {
    //Проверяем предпочтительную пользовательскую тему
    const defaultTheme = window.matchMedia('(prefers-color-scheme: dark)')
      .matches
      ? Theme.DARK
      : Theme.LIGHT;

    // Получаем тему из localStorage или устанавливаем предпочтительную тему
    const theme = <Theme>localStorage.getItem('theme') || defaultTheme;
    this.setTheme(theme);
  }

  get theme(): Theme {
    return this.themeSubject.value;
  }
}
