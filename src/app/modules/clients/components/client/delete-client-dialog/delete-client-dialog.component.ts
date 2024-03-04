import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialogModule } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Client } from 'src/app/modules/core/models/client.model';
import { ClientsService } from 'src/app/modules/core/services/clients.service';
import { MatButtonModule } from '@angular/material/button';
import { AlertComponent } from '../../../../shared/components/alert/alert.component';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-delete-client-dialog',
    templateUrl: './delete-client-dialog.component.html',
    styleUrls: ['./delete-client-dialog.component.scss'],
    standalone: true,
    imports: [MatDialogModule, NgIf, AlertComponent, MatButtonModule]
})
export class DeleteClientDialogComponent implements OnInit {
  client!: Client;
  errorMessage = '';

  constructor(
    private dialogRef: MatDialogRef<DeleteClientDialogComponent>,
    @Inject(MAT_DIALOG_DATA) private data: { client: Client },
    private clientService: ClientsService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.client = this.data.client;
  }
  onDelete() {
    this.clientService.deleteClient(this.client.id).subscribe({
      next: () => {
        this.dialogRef.close();
        this.router.navigate(['/klienci']);
      },
      error: (err) => {
        this.errorMessage = 'wystapil blad.';
      },
    });
  }
}
