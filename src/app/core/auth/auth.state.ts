import { Injectable, inject } from '@angular/core';
import { Action, Selector, State, StateContext } from '@ngxs/store';
import { EMPTY, Observable, throwError } from 'rxjs';
import { catchError, finalize, map, switchMap } from 'rxjs/operators';
import { AuthApiService } from './auth-api.service';
import {
  AdminLogin,
  AuthFailure,
  ClearError,
  LoadTokenFromStorage,
  Login,
  Logout,
  Register,
  SetToken,
} from './auth.actions';
import { AuthStateModel, AuthTokenResponse } from './auth.model';
import { TokenStorageService } from './token-storage.service';

const AUTH_DEFAULTS: AuthStateModel = {
  token: null,
  isLoading: false,
  error: null,
  user: null,
};

@State<AuthStateModel>({
  name: 'auth',
  defaults: AUTH_DEFAULTS,
})
@Injectable()
export class AuthState {
  private readonly authApi = inject(AuthApiService);
  private readonly tokenStorage = inject(TokenStorageService);

  @Selector()
  static token(state: AuthStateModel): string | null {
    return state.token;
  }

  @Selector()
  static isAuthenticated(state: AuthStateModel): boolean {
    return Boolean(state.token);
  }

  @Selector()
  static isLoading(state: AuthStateModel): boolean {
    return state.isLoading;
  }

  @Selector()
  static error(state: AuthStateModel): string | null {
    return state.error;
  }

  @Action(LoadTokenFromStorage)
  loadTokenFromStorage(ctx: StateContext<AuthStateModel>): void {
    const token = this.tokenStorage.getToken();
    ctx.patchState({ token });
  }

  @Action(SetToken)
  setToken(ctx: StateContext<AuthStateModel>, action: SetToken): void {
    ctx.patchState({
      token: action.token,
      error: null,
    });
  }

  @Action(Logout)
  logout(ctx: StateContext<AuthStateModel>): void {
    this.tokenStorage.clearToken();
    ctx.setState({ ...AUTH_DEFAULTS });
  }

  @Action(AuthFailure)
  authFailure(ctx: StateContext<AuthStateModel>, action: AuthFailure): void {
    ctx.patchState({
      error: action.error,
    });
  }

  @Action(ClearError)
  clearError(ctx: StateContext<AuthStateModel>): void {
    ctx.patchState({ error: null });
  }

  @Action(Login)
  login(ctx: StateContext<AuthStateModel>, action: Login): Observable<AuthTokenResponse> {
    if (ctx.getState().isLoading) {
      return EMPTY;
    }

    return this.authenticate(ctx, this.authApi.login(action.payload));
  }

  @Action(AdminLogin)
  adminLogin(
    ctx: StateContext<AuthStateModel>,
    action: AdminLogin,
  ): Observable<AuthTokenResponse> {
    if (ctx.getState().isLoading) {
      return EMPTY;
    }

    return this.authenticate(ctx, this.authApi.adminLogin(action.payload));
  }

  @Action(Register)
  register(ctx: StateContext<AuthStateModel>, action: Register): Observable<AuthTokenResponse> {
    if (ctx.getState().isLoading) {
      return EMPTY;
    }

    return this.authenticate(ctx, this.authApi.register(action.payload));
  }

  private authenticate(
    ctx: StateContext<AuthStateModel>,
    request$: Observable<AuthTokenResponse>,
  ): Observable<AuthTokenResponse> {
    ctx.patchState({
      isLoading: true,
      error: null,
    });

    return request$.pipe(
      switchMap(({ token }) => {
        this.tokenStorage.setToken(token);
        return ctx.dispatch(new SetToken(token)).pipe(map(() => ({ token })));
      }),
      catchError((error: unknown) => {
        const message = this.resolveErrorMessage(error);
        ctx.dispatch(new AuthFailure(message));
        return throwError(() => error);
      }),
      finalize(() => {
        ctx.patchState({ isLoading: false });
      }),
    );
  }

  private resolveErrorMessage(error: unknown): string {
    if (error instanceof Error && error.message.trim()) {
      return error.message;
    }

    return 'Erro ao autenticar';
  }
}
