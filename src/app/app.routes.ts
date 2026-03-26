import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () =>
      import('./pages/home/home-page.component').then((m) => m.HomePageComponent),
  },
  {
    path: 'cv',
    loadComponent: () =>
      import('./pages/cv/cv-page.component').then((m) => m.CvPageComponent),
  },
  {
    path: 'articles',
    loadComponent: () =>
      import('./pages/articles/articles-page.component').then((m) => m.ArticlesPageComponent),
  },
  { path: '**', redirectTo: 'home' },
];
