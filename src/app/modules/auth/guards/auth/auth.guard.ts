import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { FirebaseService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private firebase: FirebaseService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.firebase.redirectUrl = state.url;

      return this.firebase.user.pipe(
        take(1),
        map((user: User|undefined) => {

          if (!user) {
            this.router.navigate(['auth', 'login'], { queryParams: { returnUrl: state.url } });
            return false;
          }

          if (!user.emailVerified) {
            this.router.navigate(['auth', 'verify-email'], { queryParams: { returnUrl: state.url } });
            return false;
          }

          // console.log(user.roles)

          // if (user.roles && (user.roles.student || user.roles.employer)) {
          //   return true;
          // }

          // this.router.navigate(['auth', 'add-user-data'])

          return true;

        }),
      )
  }

}
