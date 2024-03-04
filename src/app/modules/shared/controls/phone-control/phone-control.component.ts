import { Component, OnDestroy } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators, ReactiveFormsModule } from '@angular/forms';
import { Subscription, combineLatest } from 'rxjs';
import { NgIf } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
    selector: 'app-phone-control',
    templateUrl: './phone-control.component.html',
    styleUrls: ['./phone-control.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: PhoneControlComponent,
            multi: true,
        },
    ],
    standalone: true,
    imports: [MatFormFieldModule, MatInputModule, ReactiveFormsModule, NgIf]
})
export class PhoneControlComponent implements ControlValueAccessor, OnDestroy {
  numberPrefixControl = new FormControl('', [Validators.required]);
  numberControl = new FormControl('', [Validators.required]);
  sub = new Subscription();
  onChange = (value: string | null) => {};
  onTouch = () => {};

  constructor() {
    this.sub.add(
      combineLatest([
        this.numberPrefixControl.valueChanges,
        this.numberControl.valueChanges,
      ]).subscribe(([prefix, number]) => {
        if (prefix && number) {
          this.onChange(`+${prefix}${number}`);
        } else {
          this.onChange(null);
        }
      }),
    );
  }

  writeValue(value: string): void {
    const valueWithoutPlus = value.replace('+', '');
    const prefix = valueWithoutPlus.slice(0, 2);
    const number = valueWithoutPlus.slice(2);

    this.numberPrefixControl.setValue(prefix);
    this.numberControl.setValue(number);
  }

  registerOnChange(fn: () => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouch = fn;
  }
  setDisabledState?(isDisabled: boolean): void {
    if (isDisabled) {
      this.numberControl.disable();
      this.numberPrefixControl.disable();
    } else {
      this.numberControl.enable();
      this.numberPrefixControl.enable();
    }
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
