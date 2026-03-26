import { Component, inject, computed } from '@angular/core';
import { ThemeService } from '../theme.service';

@Component({
  selector: 'app-theme-switcher',
  standalone: true,
  templateUrl: './theme-switcher.component.html',
  styleUrl: './theme-switcher.component.scss',
})
export class ThemeSwitcherComponent {
  private readonly themeService = inject(ThemeService);

  readonly isDark = computed(() => this.themeService.theme() === 'dark');

  toggle(): void {
    this.themeService.toggle();
  }
}
