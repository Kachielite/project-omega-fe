export interface IErrorResponse {
  status: number;
  error: IErrorMessage;
}

export interface IErrorMessage {
  code: number;
  message: string;
}
