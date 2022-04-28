import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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
  myNFTs: MyNft[];
  myNewNft?: MyNft;
  isActive: boolean = false;

  selectedFile?: File;
  retrievedImage: any;
  base64Data: any;
  retrieveResonse: any;
  message?: string;
  imageName: any;

  constructor( private router: Router, private authService: AuthService, private myNftService: MyNftService, private httpClient: HttpClient) {
    this.user = {
      mail: "",
      password: ""
    };
    this.myNFTs = new Array();
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

  //Gets called when the user selects an image
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  //Gets called when the user clicks on submit to upload the image
  onUpload() {
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    uploadImageData.append('imageFile', this.selectedFile!, this.selectedFile?.name);
  
    //Make a call to the Spring Boot Application to save the image
    this.httpClient.post('http://localhost:8080/upload', uploadImageData, { observe: 'response' })
      .subscribe((response: any) => {
        if (response.status === 200) {
          this.message = 'Image uploaded successfully';
        } else {
          this.message = 'Image not uploaded successfully';
        }
      }
      );
  }

    //Gets called when the user clicks on retieve image button to get the image from back end
    getImage() {
    //Make a call to Sprinf Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/get/' + this.imageName)
      .subscribe(
        res => {
          this.retrieveResonse = res;
          this.base64Data = this.retrieveResonse.data;
          this.retrievedImage = 'data:image/jpeg;base64,' + this.base64Data;
        }
      );
  }



  public addNft(addForm: NgForm):void{
    this.myNewNft = addForm.value;
    if(this.myNewNft) this.myNewNft.owner = this.user;
    console.log("Form submitted", this.myNewNft);   //sistemare
    this.myNftService.addNFT(this.myNewNft!).subscribe(
      (response: MyNft) => {
        addForm.reset();
        this.onClickForm();
        this.myNFTs.splice(0, this.myNFTs.length);  //removeAll
        this.getAllNft();
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
        this.myNFTs = this.myNFTs.concat(response);
        console.log("elementi array:", this.myNFTs.length, "\n", this.myNFTs.toString()); //togliere
      },
      (error: HttpErrorResponse) => {
        alert(error.message+"\nNFT not valid"); //sistemare
      }
    );
  }

  public removeNft(remNFT: MyNft): void{
    console.log("RemoveNft submitted: ", remNFT.name);   //sistemare
    this.myNftService.deleteNFT(this.user.mail, remNFT.name).subscribe(
      (response: MyNft) => {
        this.myNFTs.splice(0, this.myNFTs.length);  //removeAll
        this.getAllNft();
      },
      (error: HttpErrorResponse) => {
        alert(error.message+"\nNft not found");
      }
    );
  }

}
