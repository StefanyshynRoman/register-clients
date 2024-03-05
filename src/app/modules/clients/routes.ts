import { Routes } from '@angular/router';
import { clientFormDeactivateGuard } from '../core/quards/client-form-deactivate.guard';
import { ClientsComponent } from './clients.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientComponent } from './components/client/client.component';

export const ROUTES_CLIENTS: Routes = [
  {
    path: '',
    component: ClientsComponent,
  },
  {
    path: 'dodaj',
    component: ClientFormComponent,
    canDeactivate: [clientFormDeactivateGuard],
  },
  {
    path: ':id',
    component: ClientComponent,
  },
];
