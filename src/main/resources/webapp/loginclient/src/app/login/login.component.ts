import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  title = 'loginclient';
  public users!: User[];
  
  constructor(private userService: UserService, private router: Router, private authService: AuthService){ }
  
  ngOnInit(): void {
    this.getUsers();
  }

  //non serve
  public getUsers(): void{
    this.userService.getUsers().subscribe(
      (response: User[]) => {
        this.users = response;
        console.log("Utenti: ", response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public submitLogin(loginForm: NgForm): void{
    console.log("Login ", loginForm.value);   //sistemare
    this.userService.loginUser(loginForm.value).subscribe(
      (response: User) => {
        console.log("User logged: ", response);
        this.authService.login(response);
        this.router.navigate(['account']);
      },
      (error: HttpErrorResponse) => {
        if(error.status == 401) alert(error.message+"\nPassword incorrect");
        else alert(error.message+"\nUser not found"); 
      }
    );
  }


  //da RIMUOVERE
  /*public submitGetUser(): void{
    console.log("MAIL: ", this.user.mail);
    this.userService.getUser(this.user.mail).subscribe(
      (response: User) => {
        this.user.password=response.password;
        console.log("Password utente: ", response.password);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }*/
}