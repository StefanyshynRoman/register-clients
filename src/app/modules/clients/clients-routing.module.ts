import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { clientFormDeactivateGuard } from '../core/quards/client-form-deactivate.guard';
import { ClientsComponent } from './clients.component';
import { ClientFormComponent } from './components/client-form/client-form.component';
import { ClientComponent } from './components/client/client.component';

const routes: Routes = [
  {
    path: '',
    component: ClientsComponent,
    // canActivate: [authGuardActivate],
    // resolve: { client: ClientResolver },
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

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ClientsRoutingModule {}
