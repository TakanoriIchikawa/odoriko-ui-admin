import type { PaginateResponse } from "@/type/api/PaginateResponse";
import type { Paginate } from "@/type/common/Paginate";

interface CrudApiClientInterface<S> {
  fetch: (params: any) => Promise<{ data: S[]; paginate: Paginate }>;
  all: (params: any) => Promise<S[]>;
  find: (id: string) => Promise<S>;
  create: (params: any) => Promise<S>;
  update: (id: string, params: any) => Promise<S>;
  destroy: (id: string) => Promise<void>;
}

export abstract class CrudApiClient<S> implements CrudApiClientInterface<S> {
  protected constructor(protected readonly basePath: string) {}

  async fetch(params: any): Promise<{ paginate: Paginate; data: S[] }> {
    return await apiFetch<PaginateResponse<S>>(`${this.basePath}`, params)
      .then((response: PaginateResponse<S> | undefined) => {
        if (response) {
          return {
            paginate: {
              currentPage: response.currentPage,
              perPage: response.perPage,
              lastPage: response.lastPage,
              total: response.total,
            },
            data: response.data,
          };
        }
        throw new Error();
      })
      .catch((error) => {
        throw this.setErrorResponse(error);
      });
  }

  async all(params: any): Promise<S[]> {
    return await apiFetch<{ data: S[] }>(`${this.basePath}/all`, params)
      .then((response: { data: S[] } | undefined) => {
        if (response) {
          return response.data;
        }
        throw new Error();
      })
      .catch((error) => {
        throw this.setErrorResponse(error);
      });
  }

  async find(id: string): Promise<S> {
    return await apiFetch<{ data: S }>(`${this.basePath}/${id}`)
      .then((response: { data: S } | undefined) => {
        if (response) {
          return response.data;
        }
        throw new Error();
      })
      .catch((error) => {
        throw this.setErrorResponse(error);
      });
  }

  async create(params: any): Promise<S> {
    const body = params instanceof FormData ? params : JSON.stringify(params);
    return await apiFetch<{ data: S }>(`${this.basePath}/`, { method: 'POST', body })
      .then((response: { data: S } | undefined) => {
        if (response) {
          return response.data;
        }
        throw new Error();
      })
      .catch((error) => {
        throw this.setErrorResponse(error);
      });
  }

  async update(id: string, params: any): Promise<S> {
    const body = params instanceof FormData ? params : JSON.stringify(params);
    return await apiFetch<{ data: S }>(`${this.basePath}/${id}`, { method: 'PUT', body })
      .then((response: { data: S } | undefined) => {
        if (response) {
          return response.data;
        }
        throw new Error();
      })
      .catch((error) => {
        throw this.setErrorResponse(error);
      });
  }

  async destroy(id: string): Promise<void> {
    return await apiFetch<void>(`${this.basePath}/${id}`, { method: 'DELETE' })
      .then(() => {
        //
      })
      .catch((error) => {
        throw this.setErrorResponse(error);
      });
  }

  setErrorResponse(error: { response?: any }) {
    return {
      status: error.response ? error.response.status : 500,
      statusText: error.response ? error.response.statusText : 'System Error',
      data: error.response ? error.response._data : { status: 'error', message: 'システムエラーが発生しました。時間をおいて再度お試しください。', errors: {}},
    }
  }
}


