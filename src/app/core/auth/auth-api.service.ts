import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {
  AuthTokenResponse,
  LoginRequestDto,
  RegisterRequestDto,
} from './auth.model';

type AuthOperation = 'login' | 'adminLogin' | 'register';

@Injectable({ providedIn: 'root' })
export class AuthApiService {
  private readonly http = inject(HttpClient);
  private readonly baseUrl = environment.apiUrl;

  login(payload: LoginRequestDto): Observable<AuthTokenResponse> {
    return this.http
      .post<AuthTokenResponse>(`${this.baseUrl}/auth/login`, payload)
      .pipe(catchError((error) => this.handleError(error, 'login')));
  }

  adminLogin(payload: LoginRequestDto): Observable<AuthTokenResponse> {
    return this.http
      .post<AuthTokenResponse>(`${this.baseUrl}/auth/admin/login`, payload)
      .pipe(catchError((error) => this.handleError(error, 'adminLogin')));
  }

  register(payload: RegisterRequestDto): Observable<AuthTokenResponse> {
    return this.http
      .post<AuthTokenResponse>(`${this.baseUrl}/auth/register`, payload)
      .pipe(catchError((error) => this.handleError(error, 'register')));
  }

  private handleError(
    error: HttpErrorResponse,
    operation: AuthOperation,
  ): Observable<never> {
    const backendMessage = this.extractBackendMessage(error);
    let message = backendMessage ?? 'Erro ao autenticar';

    if (error.status === 401) {
      message = backendMessage ?? 'Credenciais invalidas';
    } else if (error.status === 403) {
      if (operation === 'login') {
        message = backendMessage ?? 'Acesso negado: usuario ADMIN deve usar /auth/admin/login';
      } else {
        message = backendMessage ?? 'Acesso negado: requer ROLE_ADMIN';
      }
    } else if (error.status === 400) {
      if (operation === 'register') {
        message = backendMessage ?? 'Erro ao cadastrar';
      } else {
        message = backendMessage ?? 'Dados invalidos';
      }
    } else if (operation === 'register') {
      message = backendMessage ?? 'Erro ao cadastrar';
    }

    return throwError(() => new Error(message));
  }

  private extractBackendMessage(error: HttpErrorResponse): string | null {
    if (typeof error.error === 'string' && error.error.trim()) {
      return error.error;
    }

    if (error.error && typeof error.error === 'object') {
      const backendMessage = error.error.message ?? error.error.error;
      if (typeof backendMessage === 'string' && backendMessage.trim()) {
        return backendMessage;
      }
    }

    return null;
  }
}
