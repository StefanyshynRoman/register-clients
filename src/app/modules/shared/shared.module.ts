import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AlertComponent } from './components/alert/alert.component';
import { PhoneControlComponent } from './controls/phone-control/phone-control.component';
import { UnlessDirective } from './directives/unless.directive';
import { MaterialModule } from './material/material.module';
@NgModule({
  declarations: [AlertComponent, PhoneControlComponent, UnlessDirective],
  imports: [CommonModule, ReactiveFormsModule, MaterialModule],
  exports: [
    CommonModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    AlertComponent,
    PhoneControlComponent,

    UnlessDirective,
  ],
})
export class SharedModule {}
