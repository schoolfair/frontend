import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { map, Observable, take, tap } from 'rxjs';
import { AuthService } from 'src/app/modules/auth/services/firebase/firebase.service';
import { User } from 'src/app/modules/auth/services/firebase/user';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private firebase: AuthService,
    private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

      this.firebase.redirectUrl = state.url;

      return this.firebase.user.pipe(
        take(1),

        map((user: User|undefined) => !!user),
        tap((loggedIn: boolean) => {
          if (!loggedIn) {
            this.router.navigate(['/auth/login']);
          }


        }),
      )
  }

}
