import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { PostUser } from 'src/app/modules/core/models/user.model';
import { AuthService } from 'src/app/modules/core/services/auth.service';
import { FormsService } from 'src/app/modules/core/services/forms.service';
import { AlertComponent } from '../../../shared/components/alert/alert.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
    standalone: true,
    imports: [ReactiveFormsModule, MatFormFieldModule, MatInputModule, NgIf, MatButtonModule, MatIconModule, AlertComponent]
})
export class RegisterComponent implements OnInit {
  hide = true;
  errorMessage = '';

  registerForm = new FormGroup({
    email: new FormControl('', {
      validators: [
        Validators.email,
        Validators.minLength(5),
        Validators.maxLength(50),
      ],
      nonNullable: true,
    }),
    username: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
    password: new FormControl('', {
      validators: [Validators.required],
      nonNullable: true,
    }),
  });
  //hobbies: new FormArray([new FormControl('')]),
  constructor(
    private authService: AuthService,
    private router: Router,
    private formService: FormsService,
  ) {}

  get controls() {
    return this.registerForm.controls;
  }
  // get hobbies() {
  //   return this.registerForm.get('hobbies') as FormArray;
  // }
  // addControl() {
  //   this.hobbies.push(new FormControl(''));
  // }
  // removeControl(index: number) {
  //   this.hobbies.removeAt(index);
  // }

  ngOnInit(): void {
    console.log('');
    //  this.controls.username.addValidators(Validators.minLength(5));

    // this.registerForm.controls.email.disable();
  }
  getErrorMessage(control: FormControl) {
    return this.formService.getErrorMessage(control);
  }

  onRegister() {
    const userData: PostUser = this.registerForm.getRawValue();
    this.authService.register(userData).subscribe({
      next: () => {
        this.router.navigate(['/logowanie']);
      },
      error: (err) => {
        this.errorMessage = ' Wysapil bląd';
      },
    });
    // console.log(this.registerForm.value);
  }
}
