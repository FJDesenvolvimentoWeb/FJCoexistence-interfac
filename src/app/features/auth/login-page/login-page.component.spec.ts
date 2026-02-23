import { TestBed, ComponentFixture } from '@angular/core/testing';
import { LoginPageComponent } from './login-page.component';
import { AuthService } from '../../../core/auth/auth.service';
import { of, throwError } from 'rxjs';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoginPageComponent', () => {
  let fixture: ComponentFixture<LoginPageComponent>;
  let component: LoginPageComponent;
  let auth: AuthService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginPageComponent, RouterTestingModule],
      providers: [AuthService]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    auth = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  it('should validate required and email for email field', () => {
    const email = component.email;
    email?.setValue('');
    expect(email?.hasError('required')).toBeTruthy();

    email?.setValue('not-an-email');
    expect(email?.hasError('email')).toBeTruthy();

    email?.setValue('user@example.com');
    expect(email?.valid).toBeTruthy();
  });

  it('should disable submit button when form is invalid', () => {
    component.form.setValue({ email: '', password: '' });
    fixture.detectChanges();
    const btn: HTMLButtonElement | null = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(btn?.disabled).toBeTrue();
  });

  it('should call auth.login with correct values on submit', () => {
    const spy = jest.spyOn(auth, 'login').mockReturnValue(of(void 0));
    component.form.setValue({ email: 'a@b.com', password: 'abcd' });
    component.onSubmit();
    expect(spy).toHaveBeenCalledWith('a@b.com', 'abcd');
  });

  it('should display error message on auth failure', async () => {
    jest.spyOn(auth, 'login').mockReturnValue(throwError(() => new Error('Invalid credentials')));
    component.form.setValue({ email: 'a@b.com', password: 'bad' });
    component.onSubmit();
    fixture.detectChanges();
    expect(component.errorMessage).toBe('Invalid credentials');
    const el = fixture.nativeElement.querySelector('.error-message');
    expect(el).not.toBeNull();
    expect(el.textContent).toContain('Invalid credentials');
  });
});
