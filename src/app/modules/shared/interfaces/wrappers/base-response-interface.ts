export interface BaseResponse<T> {
  data: T;
  succeeded: boolean;
  errors: string[];
  message: string;
}