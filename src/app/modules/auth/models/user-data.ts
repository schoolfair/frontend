import { Roles } from "../services/firebase/user";

export interface UserDataModel {

  uid?: string;

  firstName: string;
  lastName: string;
  preferredName: string;

  age: number;
  birthdate: string;

  addressLine1: string;
  addressLine2?: string;

  city: string;
  state: string;
  zipcode: string;
  country: string;

  type: Roles;
}

export interface StudentDataModel extends UserDataModel {
  description: string;
  grade: number;
  school: string;
  tags?: string[];
}

export interface EmployerDataModel extends UserDataModel {
  institution: string;
}
