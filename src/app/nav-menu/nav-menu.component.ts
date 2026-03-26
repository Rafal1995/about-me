import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LinkButtonComponent } from '../../ui/link-button/link-button.component';

interface NavLink {
  label: string;
  href: string;
}

@Component({
  selector: 'app-nav-menu',
  imports: [RouterLink, LinkButtonComponent],
  templateUrl: './nav-menu.component.html',
  styleUrl: './nav-menu.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavMenuComponent {
  readonly links: NavLink[] = [
    { label: 'Home', href: '/' },
    { label: 'CV', href: '/cv' },
    { label: 'Articles', href: '/articles' },
  ];
}
