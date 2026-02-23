import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  standalone: true,
  selector: 'ui-text-field',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule],
  templateUrl: './ui-text-field.component.html',
  styleUrls: ['./ui-text-field.component.scss']
})
export class UiTextFieldComponent {
  @Input() label = '';
  @Input() type: string = 'text';
  @Input() placeholder = '';
  @Input() control: FormControl | null = null;
  @Input() hint = '';
  @Input() error = '';

  getErrorMessage(): string {
  const errors = this.control?.errors;
  if (!errors) return '';

  if (errors['required']) return 'Campo obrigatório.';
  if (errors['email']) return 'E-mail inválido.';
  if (errors['minlength']) return `Mínimo de ${errors['minlength'].requiredLength} caracteres.`;
  if (errors['maxlength']) return `Máximo de ${errors['maxlength'].requiredLength} caracteres.`;

  return 'Valor inválido.';
}
}
