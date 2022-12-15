import { Injectable } from '@angular/core';
import { User } from '../firebase/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }

  canRead(user: User) {
    const allowed = ['admin', 'editor', 'subscriber'];
    return this.checkAuthorization(user, allowed);
  }

  private checkAuthorization(user: User, allowedRoles: string[]): boolean {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true;
      }
    }
    return false;
  }
}
