import { inject } from '@angular/core';
import {
  CanActivateFn,
  CanMatchFn,
  Router,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngxs/store';
import { AuthSelectors } from '../auth/auth.selectors';

function resolveAuthState(): boolean | UrlTree {
  const store = inject(Store);
  const router = inject(Router);
  const isAuthenticated = store.selectSnapshot(AuthSelectors.isAuthenticated);

  return isAuthenticated ? true : router.createUrlTree(['/login']);
}

export const authCanActivateGuard: CanActivateFn = () => resolveAuthState();
export const authCanMatchGuard: CanMatchFn = () => resolveAuthState();
