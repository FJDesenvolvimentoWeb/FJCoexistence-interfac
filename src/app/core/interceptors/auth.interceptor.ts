import {
  HttpErrorResponse,
  HttpInterceptorFn,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Logout } from '../auth/auth.actions';
import { AuthSelectors } from '../auth/auth.selectors';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const store = inject(Store);
  const router = inject(Router);

  const isAuthEndpoint = req.url.includes('/auth/');
  const token = store.selectSnapshot(AuthSelectors.token);

  const requestWithToken =
    token && !isAuthEndpoint
      ? req.clone({
          setHeaders: { Authorization: `Bearer ${token}` },
        })
      : req;

  return next(requestWithToken).pipe(
    catchError((error: unknown) => {
      if (
        error instanceof HttpErrorResponse &&
        error.status === 401 &&
        !isAuthEndpoint
      ) {
        store.dispatch(new Logout());
        void router.navigate(['/login']);
      }

      return throwError(() => error);
    }),
  );
};
