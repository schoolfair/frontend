import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { Roles, User } from '../../../services/firebase/user';

@Injectable({
  providedIn: 'root'
})
export class NoRolesGuard implements CanActivate {

  constructor (
    private firebase: FirebaseService,
    private router: Router) { }

  private hasRoles(roles: Roles|undefined) {
    return roles && ((roles.student) || (roles.employer))
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.firebase.user.pipe(
      take(1),
      map((data: User|undefined) => {

        if (!data) return false;

        return !this.hasRoles(data.roles);
      })
    )
  }

}
