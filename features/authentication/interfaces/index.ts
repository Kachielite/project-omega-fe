export interface IAuthLoginRequest {
  id_token: string;
  nonce: string;
  provider: string;
}

export interface IAuthRefreshRequest {
  refresh_token: string;
}

export interface IAuthLoginResponse {
  access_token: string;
  refresh_token: string;
}

export interface IAuthCurrentUserResponse {
  id: string;
  email: string;
}
