import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute, Router } from '@angular/router';
import "rxjs/add/operator/switchMap"
import "rxjs/add/observable/of"

@Injectable()
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth, 
              private route: ActivatedRoute,
              private userService: UserService,
              private router: Router) { 
    this.user$ = afAuth.authState;    
  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl',returnUrl);

    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());


  }
  logout(){
    this.afAuth.auth.signOut().then(x => {
      console.log(this.afAuth.authState);
      this.router.navigate(['/login']);
    });
  }

  get appUser$(): Observable<AppUser>{
    return this.user$.switchMap(user => {
      if(user) return this.userService.get(user.uid);
      return Observable.of(null);
    });
  }
}