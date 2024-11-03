import { CrudApiClient } from "./base/CrudApiClient";
import type { User } from "@/interface/user";

interface AuthApiClientInterface {
  register: (params: { email: string, password: string, passwordConfirmation: string }) => Promise<User>;
  login: (params: { email: string, password: string }) => Promise<User>;
  logout: () => Promise<void>;
  currentAuth: () => Promise<User | null>;
}

export class AuthApiClient extends CrudApiClient<User> implements AuthApiClientInterface {
  constructor() { super("auth") }

  async register(params: { email: string, password: string, passwordConfirmation: string }): Promise<User> {
    return await apiFetch<{ data: User }>(`${this.basePath}/register`, { method: "POST", body: params })
      .then((response: { data: User } | undefined) => {
        if (response) {
          return response.data;
        }
        throw new Error();
      })
      .catch((error) => {
        throw this.setErrorResponse(error);
      });
  }

  async login(params: { email: string, password: string }): Promise<User> {
    return await apiFetch<{ data: User }>(`${this.basePath}/login`, { method: "POST", body: params })
      .then((response: { data: User } | undefined) => {
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

  async currentAuth(): Promise<User | null> {
    return await apiFetch<{ data: User }>(`${this.basePath}/user`, {})
      .then((response: { data: User } | undefined) => {
        if (response) {
          return response.data;
        }
        return null;
      })
      .catch((error) => {
        throw this.setErrorResponse(error);
      });
  }
}
