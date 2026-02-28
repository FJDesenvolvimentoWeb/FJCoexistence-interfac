import { createSelector } from '@ngxs/store';
import { AuthStateModel } from './auth.model';
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
}
