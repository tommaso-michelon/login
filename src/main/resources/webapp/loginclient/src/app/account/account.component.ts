import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { User } from '../user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User;

  constructor( private router: Router, private authService: AuthService) {
    this.user = {
      mail: "",
      password: ""
    };
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("currentUser") || "");
  }

  public logout():void{
    this.authService.logout();
    this.router.navigate(['login']);
  }

}
