import { CrudApiClient } from "./base/CrudApiClient";
import type { UserApi } from "@/interface/api/UserApi";

interface AuthApiClientInterface {
  register: (params: { email: string, password: string, password_confirmation: string }) => Promise<UserApi>;
  login: (params: { email: string, password: string }) => Promise<UserApi>;
  logout: () => Promise<void>;
}

export class AuthApiClient extends CrudApiClient<UserApi> implements AuthApiClientInterface {
  constructor() { super("auth") }

  async register(params: { email: string, password: string, password_confirmation: string }): Promise<UserApi> {
    return await apiFetch<{ data: UserApi }>(`${this.basePath}/register`, { method: "POST", body: params })
      .then((response: { data: UserApi } | undefined) => {
        if (response) {
          return response.data;
        }
        throw new Error();
      })
      .catch((error) => {
        throw this.setErrorResponse(error);
      });
  }

  async login(params: { email: string, password: string }): Promise<UserApi> {
    return await apiFetch<{ data: UserApi }>(`${this.basePath}/login`, { method: "POST", body: params })
      .then((response: { data: UserApi } | undefined) => {
        if (response) {
          return response.data;
        }
        throw new Error();
      })
      .catch((error) => {
        throw this.setErrorResponse(error);
      });
  }

  async logout(): Promise<void> {
    return await apiFetch<{ data: null }>(`${this.basePath}/logout`, { method: "POST", body: {} })
      .then(() => {
        //
      })
      .catch((error) => {
        throw this.setErrorResponse(error);
      });
  }
}
