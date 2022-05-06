import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MyNft } from './myNft';

@Injectable({
  providedIn: 'root'
})
export class MyNftService {
  private serverUrl = "http://localhost:8080"; 

  constructor(private http: HttpClient) { }

  /**metodi back-end
   * add
   * get all user NFTs
   * sell
   */

  public addNFT(nft: MyNft): Observable<MyNft>{
    return this.http.post<MyNft>(this.serverUrl+'/nft', nft);
  }

  public getAllNFT(mail: string): Observable<MyNft[]>{
    return this.http.get<MyNft[]>(this.serverUrl+'/nft/'+mail); //pass mail
  }

  public updateNFT(nft: MyNft): Observable<MyNft>{
    return this.http.put<MyNft>(this.serverUrl+'/nft', nft);
  }

  public deleteNFT(mail: string, nftName: string): Observable<MyNft>{
    return this.http.delete<MyNft>(this.serverUrl+'/nft/'+mail+'/'+nftName);
  }

}
