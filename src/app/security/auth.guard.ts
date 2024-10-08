import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
    ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {

    if(this.auth.isAccessTokenInvalid()){
      return this.auth.getNewAccessToken()
        .then(() => {
          if(this.auth.isAccessTokenInvalid()){
            this.router.navigate(['/login']);
            return false;
          }

          return true;
        });
    }else if(next.data.roles && !this.auth.hasRolePermission(next.data.roles)){
      this.router.navigate(['page-no-authorized'])
      return false;
    }

    return true;
  }
}
