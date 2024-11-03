import { UserApiClient } from "./api/UserApiClient";
import type { User } from "@/interface/user";
import type { ErrorResponse } from "@/type/api/ErrorResponse";
import type { Paginate } from "@/type/common/paginate";

const userApiClient = new UserApiClient();

export const useUser = () => {
  const user = useState<User | null>("user", () => {
    return null;
  });

  const users = useState<User[]>("users", () => {
    return [];
  });

  const { paginate } = usePaginate();

  const fetch = async (params: any): Promise<void> => {
    return userApiClient.fetch(params).then((data: { paginate: Paginate, data: User[] }) => {
      paginate.value = data.paginate
      users.value = data.data;
    }).catch((errorResponse: ErrorResponse) => {
      throw errorResponse
    })
  };

  const all = async (params: any): Promise<void> => {
    return userApiClient.all(params).then((data: User[]) => {
      users.value = data;
    }).catch((errorResponse: ErrorResponse) => {
      throw errorResponse
    })
  }

  const find = async (id: string): Promise<void> => {
    return userApiClient.find(id).then((data: User | null) => {
      user.value = data;
    }).catch((errorResponse: ErrorResponse) => {
      throw errorResponse
    })
  }

  return {
    user,
    users,
    fetch,
    all,
    find,
  };
};
