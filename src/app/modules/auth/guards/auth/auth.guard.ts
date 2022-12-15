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


      return this.firebase.user.pipe(
        take(1),
        tap((user: User|undefined) => {
          if (!user?.emailVerified) {
            this.router.navigate(['verify-email']);
          }
        }),
        map((user: User|undefined) =>  user && user.emailVerified ? true : false),
        tap((passed:boolean) => {
          if (!passed) {
            this.router.navigate(['login'])
          }
        })
      )
  }

}
