import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../interface/user';
import { UserService } from '../service/user.service';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'NFT store';
  public users!: User[];

  alertMsg: string;
  visibleAlert: boolean;

  constructor(private userService: UserService, private router: Router, private authService: AuthService){
    this.alertMsg = "";
    this.visibleAlert = false;
  }
  
  ngOnInit(): void {
    this.getUsers();
  }

  //not used
  public getUsers(): void {
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log("Utenti: ", response);
      },
      (error: HttpErrorResponse) => {
        console.log(error.message);
      }
    );
  }

  public submitLogin(loginForm: NgForm): void {
    //console.log("Login ", loginForm.value);
    this.userService.loginUser(loginForm.value).subscribe(
      (response: User) => {
        console.log("User logged: ", response);
        this.authService.login(response);
        this.router.navigate(['account']);
      },
      (error: HttpErrorResponse) => {
        if(error.status == 401){
          this.alertMsg = "<strong>WARNING</strong><br >Password incorrect";
          this.visibleAlert = true;
          console.log(error.message);
        } 
        else{
          this.alertMsg = "<strong>WARNING</strong><br >User not found";
          this.visibleAlert = true;
          console.log(error.message); 
        }
      }
    );
  }

  //close alert - not visible
  onClosed(): void {
    this.visibleAlert = false;
  }

}