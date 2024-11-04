// interface/converters/userConverter.ts
import type { UserApi } from "@/interface/api/UserApi";
import type { User } from "@/interface/entities/User";
import dayjs from "dayjs";

export const convertUserApiToUser = (userApi: UserApi): User => {
  return {
    id: userApi.id,
    name: userApi.name,
    email: userApi.email,
    image: userApi.image,
    gender: userApi.gender,
    genderText: getGenderText(userApi.gender),
    dateOfBirth: userApi.date_of_birth ? dayjs(userApi.date_of_birth).format("YYYY-MM-DD") : null,
    firstName: userApi.first_name,
    lastName: userApi.last_name,
    firstNameKana: userApi.first_name_kana,
    lastNameKana: userApi.last_name_kana,
    tel: userApi.tel,
    postCode: userApi.post_code,
    prefecture: userApi.prefecture,
    city: userApi.city,
    town: userApi.town,
    address: userApi.address,
    createdAt: dayjs(userApi.created_at).format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: dayjs(userApi.updated_at).format('YYYY-MM-DD HH:mm:ss'),
  };
};

const getGenderText = (gender: "male" | "female" | "other" | null): string => {
  switch (gender) {
    case "male":
      return "男性";
    case "female":
      return "女性";
    case "other":
      return "その他";
    default:
      return "";
  }
};
