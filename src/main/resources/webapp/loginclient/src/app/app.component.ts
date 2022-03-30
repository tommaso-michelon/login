import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from './user';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'loginclient';
  public users!: User[];
  user: User = {
    mail: "",
    password: ""
  };
  
  constructor(private userService: UserService){}
  
  ngOnInit(): void {
    this.getUsers();
  }

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

  submitLogin(loginForm: NgForm): void{
    console.log("Login ", loginForm.value);   //sistemare
    this.userService.loginUser(loginForm.value).subscribe(
      (response: User) => {
        console.log("User logged: ", response);
      },
      (error: HttpErrorResponse) => {
        if(error.status == 401) alert(error.message+"\nPassword incorrect");
        else alert(error.message+"\nUser not found"); 
      }
    );
  }

  public submitGetUser(): void{
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
  }
}