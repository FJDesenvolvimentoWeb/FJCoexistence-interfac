import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, of } from 'rxjs';
import { Store } from '@ngxs/store';
import { LoginPageComponent } from './login-page.component';
import { ClearError, Login } from '../../../core/auth/auth.actions';
import { AuthSelectors } from '../../../core/auth/auth.selectors';

describe('LoginPageComponent', () => {
  let fixture: ComponentFixture<LoginPageComponent>;
  let component: LoginPageComponent;
  let store: {
    select: jest.Mock;
    dispatch: jest.Mock;
  };
  let isLoadingSubject: BehaviorSubject<boolean>;
  let errorSubject: BehaviorSubject<string | null>;

  beforeEach(async () => {
    isLoadingSubject = new BehaviorSubject<boolean>(false);
    errorSubject = new BehaviorSubject<string | null>(null);

    store = {
      select: jest.fn((selector: unknown) => {
        if (selector === AuthSelectors.isLoading) {
          return isLoadingSubject.asObservable();
        }

        if (selector === AuthSelectors.error) {
          return errorSubject.asObservable();
        }

        return of(null);
      }),
      dispatch: jest.fn(() => of(void 0)),
    };

    await TestBed.configureTestingModule({
      imports: [LoginPageComponent, RouterTestingModule],
      providers: [
        { provide: Store, useValue: store },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              data: {},
            },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should validate required and email for email field', () => {
    const email = component.email;
    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();

    email.setValue('not-an-email');
    expect(email.hasError('email')).toBeTruthy();

    email.setValue('user@example.com');
    expect(email.valid).toBeTruthy();
  });

  it('should disable submit button when form is invalid', () => {
    component.form.setValue({ email: '', password: '' });
    fixture.detectChanges();
    const btn: HTMLButtonElement | null = fixture.nativeElement.querySelector('button[type="submit"]');
    expect(btn?.disabled).toBeTrue();
  });

  it('should dispatch login actions with correct values on submit', () => {
    component.form.setValue({ email: 'a@b.com', password: 'abcd' });

    component.onSubmit();

    expect(store.dispatch).toHaveBeenNthCalledWith(1, new ClearError());
    expect(store.dispatch).toHaveBeenNthCalledWith(
      2,
      new Login({ username: 'a@b.com', password: 'abcd' }),
    );
  });

  it('should display error message from auth selector', () => {
    errorSubject.next('Credenciais invalidas');
    fixture.detectChanges();

    const el: HTMLElement | null = fixture.nativeElement.querySelector('.error-message');
    expect(el).not.toBeNull();
    expect(el?.textContent).toContain('Credenciais invalidas');
  });
});
