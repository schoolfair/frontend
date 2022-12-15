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

  private emptyRoles(roles: Roles|undefined) {
    return roles && (!roles.student) && (!roles.employer) && (!roles.admin)
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      return this.firebase.user.pipe(
        take(1),
        tap((user: User|undefined) => {
          if (this.emptyRoles(user?.roles)) {
            this.router.navigate(['auth', 'add-user-data'])
          }
        }),
        map((user: User|undefined) =>  user && !this.emptyRoles(user.roles) ? true : false),
        tap((passed:boolean) => {
          if (!passed) {
            this.router.navigate(['auth', 'login'])
          }
        })
      );
  }

}
