import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{
  private serverUrl = "http://localhost:8080";
  currentUser?: User;

  constructor(private http: HttpClient, private router: Router) {
    this.isUserLoggedIn();
   }
  
  public isUserLoggedIn(): boolean{
    const temp = localStorage.getItem("currentUser");
    if(typeof temp == 'string'){
      this.currentUser = JSON.parse(temp);
      return true;
    }
    this.currentUser = {
      mail: "",
      password: ""
    };
    return false;
  }

  public login(user: User): void{
    localStorage.setItem("currentUser", JSON.stringify(user));
    this.isUserLoggedIn();
  }

  public logout(): void {
    localStorage.removeItem("currentUser");
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.isUserLoggedIn())
      return true;
    this.router.navigate(['login']);
    return false;
  }

}
