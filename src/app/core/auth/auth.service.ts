import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { delay } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  login(email: string, password: string): Observable<void> {
    const valid = !!email && email.includes('@') && password && password.length >= 4;
    if (valid) {
      return of(void 0).pipe(delay(600));
    }
    return throwError(() => new Error('Credenciais inválidas')).pipe(delay(600));
  }
}
