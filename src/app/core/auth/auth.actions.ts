import { LoginRequestDto, RegisterRequestDto } from './auth.model';

export class Login {
  static readonly type = '[Auth] Login';

  constructor(public readonly payload: LoginRequestDto) {}
}

export class AdminLogin {
  static readonly type = '[Auth] Admin Login';

  constructor(public readonly payload: LoginRequestDto) {}
}

export class Register {
  static readonly type = '[Auth] Register';

  constructor(public readonly payload: RegisterRequestDto) {}
}

export class Logout {
  static readonly type = '[Auth] Logout';
}

export class LoadTokenFromStorage {
  static readonly type = '[Auth] Load Token From Storage';
}

export class SetToken {
  static readonly type = '[Auth] Set Token';

  constructor(public readonly token: string | null) {}
}

export class AuthFailure {
  static readonly type = '[Auth] Failure';

  constructor(public readonly error: string) {}
}

export class ClearError {
  static readonly type = '[Auth] Clear Error';
}
