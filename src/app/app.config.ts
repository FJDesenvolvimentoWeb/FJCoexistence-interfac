import {
  APP_INITIALIZER,
  ApplicationConfig,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideStore, Store } from '@ngxs/store';
import { firstValueFrom } from 'rxjs';

import { routes } from './app.routes';
import { LoadTokenFromStorage } from './core/auth/auth.actions';
import { AuthState } from './core/auth/auth.state';
import { authInterceptor } from './core/interceptors/auth.interceptor';

function initializeAuthState(store: Store): () => Promise<void> {
  return () =>
    firstValueFrom(store.dispatch(new LoadTokenFromStorage())).then(() => undefined);
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideHttpClient(withInterceptors([authInterceptor])),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideStore([AuthState]),
    {
      provide: APP_INITIALIZER,
      multi: true,
      useFactory: initializeAuthState,
      deps: [Store],
    },
  ],
};
