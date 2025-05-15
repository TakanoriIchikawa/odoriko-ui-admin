import { AuthApiClient } from "./api/AuthApiClient";
import { convertUserApiToUser } from "@/interface/converters/userConverter";
import type { UserApi } from "@/interface/api/UserApi";
import type { User } from "@/interface/entities/User";
import type { ErrorResponse } from "@/type/api/ErrorResponse";

const authApiClient = new AuthApiClient();

export const useAuth = () => {
  const auth = useState<User | null>("auth", () => {
    return null;
  });

  const register = async (params: { email: string, password: string, password_confirmation: string }): Promise<void> => {
    return authApiClient.register(params).then((data: UserApi) => {
      auth.value = convertUserApiToUser(data);
    }).catch((errorResponse: ErrorResponse) => {
      throw errorResponse;
    });
  };

  const login = async (params: { email: string, password: string }): Promise<void> => {
    return authApiClient.login(params).then((data: UserApi) => {
      auth.value = convertUserApiToUser(data);
    }).catch((errorResponse: ErrorResponse) => {
      throw errorResponse;
    });
  };

  const logout = async (): Promise<void> => {
    return authApiClient.logout().then(() => {
      auth.value = null;
    }).catch((errorResponse: ErrorResponse) => {
      throw errorResponse;
    });
  };

  const update = async (params: any): Promise<void> => {
    return authApiClient.update('account', params).then((data: UserApi | null) => {
      auth.value = data ? convertUserApiToUser(data) : null;
    }).catch((errorResponse: ErrorResponse) => {
      throw errorResponse
    })
  }

  const destroy = async (): Promise<void> => {
    return authApiClient.destroy('account').then(() => {
      auth.value = null;
    }).catch((errorResponse: ErrorResponse) => {
      throw errorResponse
    })
  }

  return {
    auth,
    register,
    login,
    logout,
    update,
    destroy,
  };
};

export const fetchCurrentAuth = async (): Promise<User | null> => {
  try {
    const response = await apiFetch<{ data: UserApi }>("/auth/admin", {});
    if (response) {
      return response.data ? convertUserApiToUser(response.data) : null;
    }
    return null;
  } catch (error: any) {
    if ([401, 419].includes(error?.response?.status)) {
      return null;
    }
    throw error;
  }
};
