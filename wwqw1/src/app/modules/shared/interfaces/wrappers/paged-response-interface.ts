import { BaseResponse } from "./base-response-interface";

export interface PagedResponse<T> extends BaseResponse<T> {
  data: T;
  pageNumber: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
}