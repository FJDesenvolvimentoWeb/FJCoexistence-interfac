import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngxs/store';
import { UiModule } from '../../../ui/ui.module';
import { AdminLogin, ClearError, Login } from '../../../core/auth/auth.actions';
import { AuthSelectors } from '../../../core/auth/auth.selectors';
import { UiLogoComponent } from '../../../ui/logo/ui-logo.component';

@Component({
  standalone: true,
  selector: 'app-login-page',
  imports: [CommonModule, ReactiveFormsModule, RouterModule, UiModule, UiLogoComponent],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {
  form: FormGroup;
  readonly isLoading$: Observable<boolean>;
  readonly errorMessage$: Observable<string | null>;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store,
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.isLoading$ = this.store.select(AuthSelectors.isLoading);
    this.errorMessage$ = this.store.select(AuthSelectors.error);
  }

  get email() {
    return this.form.get('email') as FormControl;
  }

  get password() {
    return this.form.get('password') as FormControl;
  }

  onSubmit(): void {
    if (this.store.selectSnapshot(AuthSelectors.isLoading)) {
      return;
    }

    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, password } = this.form.getRawValue() as { email: string; password: string };
    const isAdminLogin = this.route.snapshot.data['authMode'] === 'admin';
    const action = isAdminLogin
      ? new AdminLogin({ username: email, password })
      : new Login({ username: email, password });

    this.store.dispatch(new ClearError());
    this.store.dispatch(action).subscribe({
      next: () => {
        void this.router.navigate(['/app']);
      },
      error: () => void 0,
    });
  }

  goRegister(): void {
    void this.router.navigate(['/register']);
  }
}
