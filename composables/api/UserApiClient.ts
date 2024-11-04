import { CrudApiClient } from "./base/CrudApiClient";
import type { UserApi } from "@/interface/api/UserApi";

interface UserApiClientInterface {
  //
}

export class UserApiClient extends CrudApiClient<UserApi> implements UserApiClientInterface {
  constructor() { super("users") }
}
