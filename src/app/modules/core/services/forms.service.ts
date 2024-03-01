import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class FormsService {
  constructor() {}
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
}
