import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { ClientsService } from '../../../core/services/clients.service';
import { Client } from '../../../core/models/client.model';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import {
  Subscription,
  debounceTime,
  distinctUntilChanged,
  map,
  merge,
  startWith,
  switchMap,
} from 'rxjs';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-clients-table',
    templateUrl: './clients-table.component.html',
    styleUrls: ['./clients-table.component.scss'],
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, MatTableModule, MatSortModule, HighlightDirective, MatButtonModule, RouterLink, MatPaginatorModule]
})
export class ClientsTableComponent implements AfterViewInit, OnDestroy {
  displayedColumns: string[] = [
    'lp',
    'firstname',
    'surname',
    'email',
    'buttons',
  ];
  totalCount = 0;
  dataSource!: MatTableDataSource<Client>;
  filtertValue = new FormControl('', { nonNullable: true });
  sub = new Subscription();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clientService: ClientsService) {}

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    this.sub.add(
      merge(this.sort.sortChange, this.paginator.page)
        .pipe(
          startWith({}),
          switchMap(() => {
            const pageIndex = this.paginator.pageIndex + 1;
            const itemPerPage = this.paginator.pageSize;
            const sortDirection = this.sort.direction;
            const sortColumnName = this.sort.active;

            return this.clientService.getClients(
              pageIndex,
              itemPerPage,
              sortDirection,
              sortColumnName,
            );
          }),
          map((data) => {
            this.totalCount = data.totalCount;
            return data.clients;
          }),
        )
        .subscribe((clients) => {
          this.dataSource = new MatTableDataSource<Client>(clients);
        }),
    );
    this.sub.add(
      this.filtertValue.valueChanges
        .pipe(debounceTime(500), distinctUntilChanged())
        .subscribe((value) => {
          const val = value?.trim();
          this.applyFilter(val);
        }),
    );
  }

  applyFilter(val: string) {
    const pageIndex = this.paginator.pageIndex + 1;
    const itemPerPage = this.paginator.pageSize;
    const sortDirection = this.sort.direction;
    const sortColumnName = this.sort.active;

    this.clientService
      .getClients(pageIndex, itemPerPage, sortDirection, sortColumnName, val)
      .subscribe({
        next: (resp) => {
          this.totalCount = resp.totalCount;
          this.dataSource = new MatTableDataSource<Client>(resp.clients);
        },
      });
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe;
  }
}
