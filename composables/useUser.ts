import { UserApiClient } from "./api/UserApiClient";
import { convertUserApiToUser } from "@/interface/converters/userConverter";
import type { UserApi } from "@/interface/api/UserApi";
import type { User } from "@/interface/entities/User";
import type { ErrorResponse } from "@/type/api/ErrorResponse";
import type { Paginate } from "@/type/common/Paginate";

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
    return userApiClient.fetch(params).then((data: { paginate: Paginate, data: UserApi[] }) => {
      paginate.value = data.paginate
      users.value = data.data.map(convertUserApiToUser);
    }).catch((errorResponse: ErrorResponse) => {
      throw errorResponse
    })
  };

  const all = async (params: any): Promise<void> => {
    return userApiClient.all(params).then((data: UserApi[]) => {
      users.value = data.map(convertUserApiToUser);
    }).catch((errorResponse: ErrorResponse) => {
      throw errorResponse
    })
  }

  const find = async (id: string): Promise<void> => {
    return userApiClient.find(id).then((data: UserApi | null) => {
      user.value = data ? convertUserApiToUser(data) : null;
    }).catch((errorResponse: ErrorResponse) => {
      throw errorResponse
    })
  }

  const create = async (params: any): Promise<void> => {
    return userApiClient.create(params).then((data: UserApi | null) => {
      user.value = data ? convertUserApiToUser(data) : null;
    }).catch((errorResponse: ErrorResponse) => {
      throw errorResponse
    })
  }

  const update = async (id: string, params: any): Promise<void> => {
    return userApiClient.update(id, params).then((data: UserApi | null) => {
      user.value = data ? convertUserApiToUser(data) : null;
    }).catch((errorResponse: ErrorResponse) => {
      throw errorResponse
    })
  }

  const destroy = async (id: string): Promise<void> => {
    return userApiClient.destroy(id).then(() => {
      user.value = null;
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
    create,
    update,
    destroy,
  };
};