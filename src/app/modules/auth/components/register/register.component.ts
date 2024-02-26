import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  hide = true;
  registerForm = new FormGroup({
    email: new FormControl('', [
      Validators.email,
      Validators.minLength(5),
      Validators.maxLength(50),
    ]),
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', { validators: [Validators.required] }),
  });

  ngOnInit(): void {
    console.log('');
    this.registerForm.controls.email.disable();
  }

  onRegister() {
    console.log(this.registerForm.value);
  }
}
