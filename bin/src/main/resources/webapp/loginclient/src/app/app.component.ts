import { HttpErrorResponse } from '@angular/common/http';
import { Component } from '@angular/core';
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
  
  constructor(private userService: UserService){}
  
  ngOnInit(): void {
    this.getUsers();
    //this.getUser();
  }

  public getUsers(): void{
    this.userService.getUsers().subscribe(
      (response: User[] ) => {
        this.users = response;
        console.log("Utenti: ", response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }

  public getUser(): void{
    this.userService.getUser().subscribe(
      (response: any ) => { //GUARDARE ANY
        this.users = response;
        console.log("Utente: ", response);
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
      }
    );
  }
}
