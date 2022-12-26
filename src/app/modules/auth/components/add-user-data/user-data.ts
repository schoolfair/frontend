
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
}

export interface StudentDataModel extends UserDataModel {
  description: string;
  grade: number;
  school: string;
}

export interface EmployerDataModel extends UserDataModel {
  institution: string;
}
