import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MyNftService } from '../my-nft.service';
import { MyNft } from '../myNft';
import { User } from '../user';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User;
  myNFTs?: MyNft[];
  myNewNft?: MyNft;
  isActive: boolean = false;

  constructor( private router: Router, private authService: AuthService, private myNftService: MyNftService) {
    this.user = {
      mail: "",
      password: ""
    };
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("currentUser") || "");
    this.getAllNft();
  }

  public logout():void{
    this.authService.logout();
    this.router.navigate(['login']);
  }

  public onClickForm(): void{
    this.isActive = !this.isActive;
  }

  public submitAdd(): void{
    console.log("add sumbitted");
  }

  public addNft(addForm: NgForm):void{
    console.log("Form submitted", addForm.value);   //sistemare
    this.myNftService.addNFT(addForm.value).subscribe(
      (response: MyNft) => {
        addForm.reset();
        this.router.navigate(['account']);  //tenere?
        this.onClickForm();
      },
      (error: HttpErrorResponse) => {
        alert(error.message+"\nNFT not valid");
        addForm.reset();
      }
    );
  }

  public getAllNft():void{
    console.log("GetAll submitted");   //sistemare
    var mail: string = JSON.parse(localStorage.getItem("currentUser") || "").mail;
    this.myNftService.getAllNFT(mail).subscribe(
      (response: MyNft[]) => {
        //show nfts
      },
      (error: HttpErrorResponse) => {
        alert(error.message+"\nNFT not valid"); //sistemare
      }
    );
  }

}
