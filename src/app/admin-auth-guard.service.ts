import { Observable } from 'rxjs/Observable';
import { UserService } from './user.service';
import { AuthService } from './auth.service';
import { CanActivate, Router } from '@angular/router';
import { Injectable } from '@angular/core';

import "rxjs/add/operator/map"

@Injectable()
export class AdminAuthGuard implements CanActivate {

  constructor(private auth: AuthService,
              private userService: UserService,
              private router: Router) { }

  canActivate(): Observable<boolean>{
    return this.auth.appUser$.map(appUser => {
      if(appUser.isAdmin){
        return true;
      }else{
        this.router.navigate(['/']);
        return false;
      }
    })
  }

}
