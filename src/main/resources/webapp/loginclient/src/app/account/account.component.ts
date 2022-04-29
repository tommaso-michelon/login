import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { MyNftService } from '../my-nft.service';
import { MyNft } from '../myNft';
import { User } from '../user';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

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
  retrievedImages: any[];
  base64Data: any;
  retrieveResponse: any;
  message?: string;
  imageName: any;

  modalRef?: BsModalRef;

  constructor( private router: Router, private authService: AuthService, private myNftService: MyNftService, private httpClient: HttpClient, private modalService: BsModalService) {
    this.user = {
      mail: "",
      password: ""
    };
    this.myNFTs = new Array();
    this.retrievedImages = new Array();
  }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("currentUser") || "");
    this.getAllNft();
  }

  public logout():void{
    this.authService.logout();
    this.router.navigate(['login']);
  }

  //Gets called when the user wants to add and nft
  public onClickForm(): void{
    this.isActive = !this.isActive;
  }

  //Gets called when the user selects an image
  public onFileChanged(event: any) {
    //Select File
    this.selectedFile = event.target.files[0];
  }

  //Gets called to get the image of an NFT from back end
  public getImage(imageName: string) {
    //Make a call to Spring Boot to get the Image Bytes.
    this.httpClient.get('http://localhost:8080/get/' + imageName)
      .subscribe(
        res => {
          this.retrieveResponse = res;
          this.base64Data = this.retrieveResponse.data;
          this.retrievedImages.push('data:image/jpeg;base64,' + this.base64Data);
        }
      );
  }


  public addNft(addForm: NgForm):void{
    this.myNewNft = addForm.value;
    if(this.myNewNft) this.myNewNft.owner = this.user;

    //image
    console.log(this.selectedFile);
    
    //FormData API provides methods and properties to allow us easily prepare form data to be sent with POST HTTP requests.
    const uploadImageData = new FormData();
    const index: number = this.user.mail.indexOf('@');
    const name: string = this.user.mail.substring(0, index)+'_'+this.myNewNft!.name+'_'+this.selectedFile!.name;
    uploadImageData.append('imageFile', this.selectedFile!, name);
    
    //image saved before nft in the DB
    var isPresent: boolean = false;
    for (var nft of this.myNFTs) {
      if(nft.name == this.myNewNft!.name) isPresent = true;
    }
    if(!isPresent){
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
    
      const image = {
        id: 0,  //correct id gived by back end
        name: name,
        type: this.selectedFile?.type || "",
        data: this.selectedFile?.arrayBuffer
      };
      this.myNewNft!.image = image;
    if(this.myNewNft) this.myNewNft.image = image;
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
        for (var nft of this.myNFTs) {
          console.log("Chiedo img: ", nft.image.name);
          this.getImage(nft.image.name);
        }
      },
      (error: HttpErrorResponse) => {
        alert(error.message+"\nNFT not valid"); //sistemare
      }
    );
  }

  openConfirm(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-sm'});
  }
 
  decline(): void {
    this.modalRef!.hide();
  }

  public removeNft(remNFT: MyNft): void{
    this.modalRef!.hide();
    console.log("RemoveNft submitted: ", remNFT.name);   //sistemare
    this.myNftService.deleteNFT(this.user.mail, remNFT.name).subscribe(
      (response: MyNft) => {
        this.myNFTs.splice(0, this.myNFTs.length);  //removeAll nft
        this.retrievedImages.splice(0, this.retrievedImages.length);  //removeAll images
        this.getAllNft();
      },
      (error: HttpErrorResponse) => {
        alert(error.message+"\nNft not found");
      }
    );
  }

}
