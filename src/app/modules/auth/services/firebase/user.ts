export interface User {
    uid: string;
    email?: string;
    displayName?: string;
    photoURL?: string;
    emailVerified?: boolean;
    roles?: Roles;
}

// Interface, Enum, or Array?
export interface Roles {
  student?: boolean,
  employer?: boolean,
  admin?: boolean
}


