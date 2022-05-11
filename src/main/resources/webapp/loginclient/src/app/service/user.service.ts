import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from '../interface/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private serverUrl = "http://localhost:8080"; 

  constructor(private http: HttpClient) { }

  public getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.serverUrl+'/users');
  }

  public getUser(mail: string): Observable<User> {
    return this.http.get<User>(this.serverUrl+'/users/'+mail);
  }

  public loginUser(user: User): Observable<User> {
    return this.http.post<User>(this.serverUrl+'/login', user);
  }

  public addUser(user: User): Observable<User> {
    return this.http.post<User>(this.serverUrl+'/users', user);
  }

  public updateUser(user: User): Observable<User> {
    return this.http.put<User>(this.serverUrl+'/users', user);
  }

  public deleteUser(mail: string): Observable<User> {
    return this.http.delete<User>(this.serverUrl+'/users/'+mail);
  }


}
