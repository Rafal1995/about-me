import { DOCUMENT, inject, Injectable, signal } from '@angular/core';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly document = inject(DOCUMENT);
  readonly theme = signal<Theme>('light');

  toggle(): void {
    const next = this.theme() === 'light' ? 'dark' : 'light';
    this.theme.set(next);
    this.document.documentElement.setAttribute('data-theme', next);
  }

  init(): void {
    this.document.documentElement.setAttribute('data-theme', this.theme());
  }
}
