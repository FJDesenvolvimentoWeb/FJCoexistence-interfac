import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { UiCardComponent } from './card/ui-card.component';
import { UiButtonComponent } from './button/ui-button.component';
import { UiTextFieldComponent } from './text-field/ui-text-field.component';
import { UiDividerLabelComponent } from './divider-label/ui-divider-label.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatFormFieldModule,
    MatInputModule,
    UiCardComponent,
    UiButtonComponent,
    UiTextFieldComponent,
    UiDividerLabelComponent,
  ],
  exports: [
    UiCardComponent,
    UiButtonComponent,
    UiTextFieldComponent,
    UiDividerLabelComponent,
  ]
})
export class UiModule {}
