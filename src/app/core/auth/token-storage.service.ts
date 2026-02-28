import { Injectable } from '@angular/core';

const AUTH_TOKEN_KEY = 'auth_token';

@Injectable({ providedIn: 'root' })
export class TokenStorageService {
  getToken(): string | null {
    return this.storage?.getItem(AUTH_TOKEN_KEY) ?? null;
  }

  setToken(token: string): void {
    this.storage?.setItem(AUTH_TOKEN_KEY, token);
  }

  clearToken(): void {
    this.storage?.removeItem(AUTH_TOKEN_KEY);
  }

  private get storage(): Storage | null {
    return typeof localStorage === 'undefined' ? null : localStorage;
  }
}
