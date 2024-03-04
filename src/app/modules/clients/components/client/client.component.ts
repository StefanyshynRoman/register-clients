import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { Client } from 'src/app/modules/core/models/client.model';
import { ClientsService } from 'src/app/modules/core/services/clients.service';
import { DeleteClientDialogComponent } from './delete-client-dialog/delete-client-dialog.component';
import { EditClientDialogComponent } from './edit-client-dialog/edit-client-dialog.component';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';

@Component({
    selector: 'app-client',
    templateUrl: './client.component.html',
    styleUrls: ['./client.component.scss'],
    standalone: true,
    imports: [NgIf, MatButtonModule]
})
export class ClientComponent implements OnInit {
  client!: Client;

  constructor(
    private clientsServise: ClientsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
  ) {}
  ngOnInit(): void {
    this.route.params
      .pipe(switchMap((params) => this.clientsServise.getClient(+params['id'])))
      .subscribe({
        next: (client) => {
          this.client = client;
        },
      });
  }
  openDialog() {
    const dialogRef = this.dialog.open(DeleteClientDialogComponent, {
      data: {
        client: this.client,
      },
    });
  }
  openEditDialog() {
    const dialogRef = this.dialog.open(EditClientDialogComponent, {
      data: {
        client: this.client,
      },
      width: '600px',
      maxWidth: '600px',
    });
  }
}
