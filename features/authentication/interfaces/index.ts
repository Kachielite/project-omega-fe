export interface IAuthLoginRequest {
  id_token: string;
  provider: 'google' | 'apple';
  nonce?: string;
}

export interface IAuthRefreshRequest {
  refresh_token: string;
}

export interface IAuthLoginResponse {
  access_token: string;
  refresh_token: string;
  user: IAuthCurrentUserResponse;
}

export interface IAuthCurrentUserResponse {
  id: string;
  email: string;
}
