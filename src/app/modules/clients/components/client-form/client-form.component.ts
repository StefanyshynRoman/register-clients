import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observer } from 'rxjs';
import {
  Client,
  PostClientForm,
} from 'src/app/modules/core/models/client.model';
import { ClientsService } from 'src/app/modules/core/services/clients.service';
import { FormsService } from 'src/app/modules/core/services/forms.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup<PostClientForm>;
  errorMessage = '';
  @Input() editMode = false;
  @Input() client!: Client;
  @Output() closeDialog = new EventEmitter<void>();

  observer: Observer<unknown> = {
    next: () => {
      this.errorMessage = '';
      if (this.editMode) {
        this.emitCloseDialog();
      }
      this.router.navigate(['/klienci']);
    },
    error: (err) => {
      this.errorMessage = 'Wystapil blad';
    },
    complete: () => {},
  };

  constructor(
    private formService: FormsService,
    private clientService: ClientsService,
    private router: Router,
  ) {}
  get controls() {
    return this.clientForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.clientForm = new FormGroup({
      firstname: new FormControl(this.editMode ? this.client.firstname : '', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(4),
        ],
      }),
      surname: new FormControl(this.editMode ? this.client.surname : '', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(4),
        ],
      }),
      email: new FormControl(this.editMode ? this.client.email : '', {
        nonNullable: true,
        validators: [Validators.required, Validators.email],
      }),
      phone: new FormControl(this.editMode ? this.client.phone : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
      address: new FormControl(this.editMode ? this.client.address : '', {
        nonNullable: true,
        validators: [
          Validators.required,
          Validators.maxLength(20),
          Validators.minLength(4),
        ],
      }),
      postcode: new FormControl(this.editMode ? this.client.postcode : '', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });
  }

  onAddClient() {
    if (this.editMode) {
      this.clientService
        .putClient(this.clientForm.getRawValue(), this.client.id)
        .subscribe(this.observer);
      return;
    }
    this.clientService
      .postClient(this.clientForm.getRawValue())
      .subscribe(this.observer);
  }
  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  emitCloseDialog() {
    this.closeDialog.emit();
  }
}
