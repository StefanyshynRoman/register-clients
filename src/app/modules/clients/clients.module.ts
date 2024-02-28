import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ClientsRoutingModule } from './clients-routing.module';
import { ClientsComponent } from './clients.component';
import { ClientsTableComponent } from './clients-table/clients-table.component';

@NgModule({
  declarations: [ClientsComponent, ClientsTableComponent],
  imports: [SharedModule, ClientsRoutingModule],
  exports: [ClientsComponent],
})
export class ClientsModule {}
