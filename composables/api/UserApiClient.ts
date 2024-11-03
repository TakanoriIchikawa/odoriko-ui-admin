import { CrudApiClient } from "./base/CrudApiClient";
import type { User } from "@/interface/user";

interface UserApiClientInterface {
  //
}

export class UserApiClient extends CrudApiClient<User> implements UserApiClientInterface {
  constructor() { super("users") }
}
