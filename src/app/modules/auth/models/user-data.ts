import { Roles } from "../services/firebase/user";

export interface UserDataModel {

  uid?: string;
  email?: string;

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
  skills?: string[];
  website?: string;
}

export interface EmployerDataModel extends UserDataModel {
  institution: string;
}
