import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../user';
import { UserService } from '../user.service';

@Component({
  selector: 'app-form-component',
  templateUrl: './form-component.component.html',
  styleUrls: ['./form-component.component.css']
})
export class FormComponentComponent implements OnInit {

  constructor(private userService: UserService) { }

  ngOnInit(): void {}

  submitAdd(addForm: NgForm): void{
    console.log("Form submitted", addForm.value);   //sistemare
    //document.getElementById('add-user-form').click();
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  submitUpdate(addForm: NgForm): void{
    console.log("Form submitted", addForm.value);   //sistemare
    //document.getElementById('update-user-form').click();
    this.userService.updateUser(addForm.value).subscribe(
      (response: User) => {
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }
    );
  }

  submitDelete(addForm: NgForm): void{
    console.log("Form submitted", addForm.value);   //sistemare
    //document.getElementById('delete-user-form').click();
    this.userService.deleteUser(addForm.value.mail).subscribe(
      (response: User) => {
        addForm.reset();
      },
      (error: HttpErrorResponse) => {
        alert(error.message+"\nUtente non esistente");
        addForm.reset();
      }
    );
  }

}
