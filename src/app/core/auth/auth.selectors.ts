import { createSelector } from '@ngxs/store';
import { AuthStateModel, AuthUser } from './auth.model';
import { AuthState } from './auth.state';

export class AuthSelectors {
  static readonly token = createSelector([AuthState], (state: AuthStateModel) => state.token);

  static readonly isAuthenticated = createSelector(
    [AuthSelectors.token],
    (token: string | null) => Boolean(token),
  );

  static readonly isLoading = createSelector(
    [AuthState],
    (state: AuthStateModel) => state.isLoading,
  );

  static readonly error = createSelector([AuthState], (state: AuthStateModel) => state.error);

  static readonly user = createSelector([AuthState], (state: AuthStateModel) => state.user);

  static readonly userDisplayName = createSelector(
    [AuthSelectors.user],
    (user: AuthUser | null) => user?.name?.trim() || user?.email?.trim() || 'Usuario',
  );
}
