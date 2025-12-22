export interface IPaginationMeta<T> {
  total: number;
  page: number;
  limit: number;
  items: T[];
}

export interface IGeneralResponse {
  message: string;
}
