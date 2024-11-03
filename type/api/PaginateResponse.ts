export type PaginateResponse<S> = {
  currentPage: number;
  lastPage: number;
  perPage: number;
  total: number;
  data: S[];
};