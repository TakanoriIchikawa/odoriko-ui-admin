export interface UserApi {
  id: string;
  name: string;
  email: string;
  image: string;
  gender: "male" | "female" | "other" | null;
  date_of_birth: string | null;
  first_name: string;
  last_name: string;
  first_name_kana: string;
  last_name_kana: string;
  tel: string;
  post_code: string;
  prefecture: string;
  city: string;
  town: string;
  address: string;
  created_at: string;
  updated_at: string;
}
