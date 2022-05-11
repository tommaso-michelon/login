import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../service/auth.service';
import { User } from '../interface/user';
import { UserService } from '../service/user.service';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {
  
  user: User;

  modalRef?: BsModalRef;

  alertMsg: string;
  visibleAlert: boolean;
  

  constructor(private userService: UserService, private router: Router, private authService: AuthService, private toastr: ToastrService, private modalService: BsModalService) { 
    this.user = {
      mail: "",
      password: ""
    };
    this.alertMsg = "";
    this.visibleAlert = false;
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("currentUser") || "");
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  public submitUpdate(managerForm: NgForm): void {
    //console.log("Update submitted", managerForm.value, "   ", managerForm.value.password);
    //new password == old password
    if(managerForm.value.password == this.user.password){
      this.alertMsg = "<strong>WARNING</strong><br >Password not changed - insert a new password";
      this.visibleAlert = true;
    }
    else{
      this.user = {
        mail: JSON.parse(localStorage.getItem("currentUser") || "").mail,
        password: managerForm.value.password
      };
      this.userService.updateUser(this.user).subscribe(
        (response: User) => {
          managerForm.reset();
          this.router.navigate(['login']);
          this.toastr.success('Please sign in again', 'Password changed!');
        },
        (error: HttpErrorResponse) => {
          console.log(error.message+"\nUser not found");
          managerForm.reset();
        }
      );
    }
  }

  //close alert - not visible
  public onClosed(): void {
    this.visibleAlert = false;
  }

  //confirm delete account
  public openConfirm(template: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }
  
  //decline delete acoount
  public decline(): void {
    this.modalRef!.hide();
  }

  public submitDelete(managerForm: NgForm): void {
    //console.log("Delete submitted", managerForm.value);
    this.user = JSON.parse(localStorage.getItem("currentUser") || "");
    this.userService.deleteUser(this.user!.mail).subscribe(
      (response: User) => {
        this.modalRef!.hide();
        managerForm.reset();
        this.router.navigate(['login']);
        this.toastr.info('Account deleted!');
      },
      (error: HttpErrorResponse) => {
        alert(error.message+"\nUser not found");
        managerForm.reset();
      }
    );
  }
  
}