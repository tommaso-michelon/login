import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { User } from '../interface/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-registration-component',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  alertMsg: string;
  visibleAlert: boolean;

  constructor(private userService: UserService, private router: Router, private toastr: ToastrService) {
    this.alertMsg = "";
    this.visibleAlert = false;
  }

  ngOnInit(): void {}


  submitAdd(addForm: NgForm): void {
    //console.log("Form submitted", addForm.value);
    this.userService.addUser(addForm.value).subscribe(
      (response: User) => {
        addForm.reset();
        this.router.navigate(['login']);
        this.toastr.success('Please sign in', 'ACCOUNT CREATED!');
      },
      (error: HttpErrorResponse) => {
        this.alertMsg = "<strong>WARNING</strong><br >Mail already registered";
        this.visibleAlert = true;
        console.log(error.message);
        addForm.reset();
      }
    );
  }

  public onClosed(): void {
    this.visibleAlert = false;
  }

}