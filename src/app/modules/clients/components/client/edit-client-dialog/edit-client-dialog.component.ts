import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Client } from 'src/app/modules/core/models/client.model';
import { ClientsService } from 'src/app/modules/core/services/clients.service';
import { ClientFormComponent } from '../../client-form/client-form.component';

@Component({
    selector: 'app-edit-client-dialog',
    templateUrl: './edit-client-dialog.component.html',
    styleUrls: ['./edit-client-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, ClientFormComponent]
})
export class EditClientDialogComponent {
  constructor(
    private dialogRef: MatDialogRef<EditClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { client: Client },
    private clientService: ClientsService,
    private router: Router,
  ) {}

  closseDialog() {
    this.dialogRef.close();
  }
}
