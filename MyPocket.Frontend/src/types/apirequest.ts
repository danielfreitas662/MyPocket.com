export interface ApiRequest<T> {
  error: boolean;
  message: string;
  statusCode: number;
  statusText: string;
  data: T;
}
