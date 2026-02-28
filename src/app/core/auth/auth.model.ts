export interface LoginRequestDto {
  username: string;
  password: string;
}

export interface RegisterRequestDto {
  name: string;
  cnpj: number;
  email: string;
  password: string;
  phone: string;
}

export interface AuthTokenResponse {
  token: string;
}

export interface AuthUser {
  id?: string;
  name?: string;
  email?: string;
}

export interface AuthStateModel {
  token: string | null;
  isLoading: boolean;
  error: string | null;
  user: AuthUser | null;
}
