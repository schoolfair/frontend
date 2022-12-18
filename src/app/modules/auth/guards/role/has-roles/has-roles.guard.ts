import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { FirebaseService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { Roles, User } from 'src/app/modules/auth/services/firebase/user';

@Injectable({
  providedIn: 'root'
})
export class HasRolesGuard implements CanActivate {

  constructor(
    private firebase: FirebaseService,
    private router: Router
    ) { }

  private hasRoles(roles: Roles|undefined) {
    return roles && ((roles.student) || (!roles.employer) || (!roles.admin))
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.firebase.user.pipe(
        take(1),
        map((user: User|undefined) => {

          if (!user) {
            this.router.navigate(['auth', 'login'])
            return false;
          }

          if (!this.hasRoles(user.roles)) {
            this.router.navigate(['auth', 'add-user-data']);
            return false;
          }

          return true;
        })
      );
  }

}
