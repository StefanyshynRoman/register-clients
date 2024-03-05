import { Routes } from '@angular/router';
import { authGuardLoad } from './modules/core/quards/auth-load.guard';

export const APP_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./modules/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'klienci',
    loadChildren: () =>
      import('./modules/clients/routes').then((m) => m.ROUTES_CLIENTS),
    canMatch: [authGuardLoad],
  },
];
