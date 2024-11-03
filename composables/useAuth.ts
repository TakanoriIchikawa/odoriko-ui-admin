import { AuthApiClient } from "./api/AuthApiClient";
import type { User } from "@/interface/user";
import type { ErrorResponse } from "@/type/api/ErrorResponse";

const authApiClient = new AuthApiClient();

export const useAuth = () => {
  const auth = useState<User | null>("auth", () => {
    return null;
  });

  const register = async (params: { email: string, password: string, passwordConfirmation: string }): Promise<void> => {
    return authApiClient.register(params).then((data: User) => {
        auth.value = data;
      })
      .catch((errorResponse: ErrorResponse) => {
        throw errorResponse;
      });
  };

  const login = async (params: { email: string, password: string }): Promise<void> => {
    return authApiClient.login(params).then((data: User) => {
        auth.value = data;
      })
      .catch((errorResponse: ErrorResponse) => {
        throw errorResponse;
      });
  };

  const logout = async (): Promise<void> => {
    return authApiClient.logout().then(() => {
        auth.value = null;
      })
      .catch((errorResponse: ErrorResponse) => {
        throw errorResponse;
      });
  };

  return {
    auth,
    register,
    login,
    logout,
  };
};

export const fetchCurrentAuth = async <User>(): Promise<User | null> => {
  try {
    const response = await apiFetch<{ data: User }>("/auth/user", {});
    if (response) {
      return response.data;
    }
    return null;
  } catch (error: any) {
    if ([401, 419].includes(error?.response?.status)) {
      return null;
    }
    throw error;
  }
};
