export interface User {
  id: string;
  name: string;
  email: string;
  image: string;
  gender: "male" | "female" | "other" | null;
  genderText: string;
  dateOfBirth: string | null;
  firstName: string;
  lastName: string;
  firstNameKana: string;
  lastNameKana: string;
  tel: string;
  postalCode: string;
  prefecture: string;
  city: string;
  town: string;
  building: string;
  createdAt: string;
  updatedAt: string;
}
