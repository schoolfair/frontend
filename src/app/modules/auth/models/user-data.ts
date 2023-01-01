import { Roles } from "../services/firebase/user";

export interface UserDataModel {

  uid?: string;

  firstName: string;
  lastName: string;
  preferredName: string;

  zipcode: string;

  type: Roles;
}

export interface StudentDataModel extends UserDataModel {
  description: string;
  grade: number;
  school: string;
  interests?: string[];
}

export interface EmployerDataModel extends UserDataModel {
  institution: string;
}
