
export interface UserDataModel {
  firstName: string;
  lastName: string;
  age: number;
  birthdate: string;
  type: UserType;
}

export interface StudentDataModel extends UserDataModel {
  grade: number;
  school: string;
}

export interface EmployerDataModel extends UserDataModel {
  institution: string;
}

export interface UserType {
  isStudent?: boolean;
  isEmployer?: boolean;
}
