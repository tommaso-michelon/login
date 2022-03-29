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

  submit(addForm: NgForm): void{
    console.log("Form submitted", addForm.value);   //sistemare
    //document.getElementById('add-user-form').click();
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        //console.log(response.mail);
        //this.userService.getUsers(); //this.getUsers()
        addForm.reset();
      }/*,
      (error: HttpErrorResponse) => {
        alert(error.message);
        addForm.reset();
      }*/
    );
  }

  public onAddEmloyee(addForm: NgForm): void {
    
  }

  ngOnInit(): void {
  }

}
