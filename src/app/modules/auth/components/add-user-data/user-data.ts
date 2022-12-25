
export interface UserDataModel {

  uid?: string;

  firstName: string;
  lastName: string;
  preferredName: string;

  age: number;
  birthdate: string;
  type: UserType;

  addressLine1: string;
  addressLine2?: string;

  city: string;
  state: string;
  zipcode: string;
  country: string;


}

export interface StudentDataModel extends UserDataModel {
  grade: number;
  school: string;
}

export interface EmployerDataModel extends UserDataModel {
  institution: string;
  listings: string[];
}

export interface UserType {
  isStudent?: boolean;
  isEmployer?: boolean;
}
