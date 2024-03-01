import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PostClientForm } from 'src/app/modules/core/models/client.model';
import { FormsService } from 'src/app/modules/core/services/forms.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.scss'],
})
export class ClientFormComponent implements OnInit {
  clientForm!: FormGroup<PostClientForm>;
  constructor(private formService: FormsService) {}
  get controls() {
    return this.clientForm.controls;
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.clientForm = new FormGroup({
      firstname: new FormControl('', { nonNullable: true }),
      surname: new FormControl('', { nonNullable: true }),
      email: new FormControl('', { nonNullable: true }),
      phone: new FormControl('', { nonNullable: true }),
      address: new FormControl('', { nonNullable: true }),
      postcode: new FormControl('', { nonNullable: true }),
    });
  }
  onAddClient() {}
  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }
}
