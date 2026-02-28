import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { ClearError, Register } from '../../../core/auth/auth.actions';
import { AuthSelectors } from '../../../core/auth/auth.selectors';
import { UiModule } from '../../../ui/ui.module';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, UiModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  form: FormGroup;
  readonly isLoading$: Observable<boolean>;
  readonly errorMessage$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private store: Store,
  ) {
    this.form = this.fb.group({
      name: ['', Validators.required],
      cnpj: ['', [Validators.required, Validators.pattern(/^\d{14}$/)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      phone: ['', [Validators.required, Validators.pattern(/^\d{10,11}$/)]],
    });

    this.isLoading$ = this.store.select(AuthSelectors.isLoading);
    this.errorMessage$ = this.store.select(AuthSelectors.error);
  }

  get name(): FormControl {
    return this.form.get('name') as FormControl;
  }

  get cnpj(): FormControl {
    return this.form.get('cnpj') as FormControl;
  }

  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }

  get password(): FormControl {
    return this.form.get('password') as FormControl;
  }

  get phone(): FormControl {
    return this.form.get('phone') as FormControl;
  }

  onSubmit(): void {
    if (this.store.selectSnapshot(AuthSelectors.isLoading)) {
      return;
    }

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, cnpj, email, password, phone } = this.form.getRawValue() as {
      name: string;
      cnpj: string;
      email: string;
      password: string;
      phone: string;
    };

    this.store.dispatch(new ClearError());
    this.store
      .dispatch(
        new Register({
          name,
          cnpj: Number(cnpj),
          email,
          password,
          phone,
        }),
      )
      .subscribe({
        next: () => {
          void this.router.navigate(['/']);
        },
        error: () => void 0,
      });
  }
}
