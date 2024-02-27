import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostUser } from 'src/app/modules/core/models/user.model';
import { AuthService } from 'src/app/modules/core/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
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
    hobbies: new FormArray([new FormControl('')]),
  });

  constructor(
    private authService: AuthService,
    private router: Router,
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
    if (control.hasError('required')) {
      return 'You must enter a value';
    }
    if (control.hasError('minlength')) {
      return 'You must enter  min 5 chars';
    }
    if (control.hasError('maxlength')) {
      return 'You must enter max 50 chars';
    }
    return control.hasError('email') ? 'Not a valid email' : '';
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
