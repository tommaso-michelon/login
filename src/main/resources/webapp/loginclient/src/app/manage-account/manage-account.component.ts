import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {
  private user?: User;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  submitUpdate(managerForm: NgForm): void{
    console.log("Update submitted", managerForm.value, "   ", managerForm.value.password);   //sistemare
    this.user = {
      mail: JSON.parse(localStorage.getItem("currentUser") || "").mail,
      password: managerForm.value.password
    };
    this.userService.updateUser(this.user).subscribe(
      (response: User) => {
        managerForm.reset();
        this.router.navigate(['login']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message+"\nUser not found");
        managerForm.reset();
      }
    );
  }

  submitDelete(managerForm: NgForm): void{
    console.log("Delete submitted", managerForm.value);   //sistemare
    this.user = JSON.parse(localStorage.getItem("currentUser") || "");
    this.userService.deleteUser(this.user!.mail).subscribe(
      (response: User) => {
        managerForm.reset();
        this.router.navigate(['login']);
      },
      (error: HttpErrorResponse) => {
        alert(error.message+"\nUser not found");
        managerForm.reset();
      }
    );
  }
  
}