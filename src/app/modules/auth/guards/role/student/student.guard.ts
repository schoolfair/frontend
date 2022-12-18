import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';

import { map, Observable, take, tap } from 'rxjs';
import { FirebaseService } from '../../../services/firebase/firebase.service';
import { User } from '../../../services/firebase/user';

@Injectable({
  providedIn: 'root'
})
export class StudentGuard implements CanActivate {

  constructor(
    private firebase: FirebaseService,
    private router: Router
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.firebase.redirectUrl = state.url;

      return this.firebase.user.pipe(
        take(1),
        map((user: User|undefined) =>  {

          if (!user) {
            this.router.navigate(['auth', 'login'], { queryParams: { returnUrl: state.url } })
          }

          if (user?.roles?.student != true) {
            return false;
          }

          return true
        })
      );
  }

}
