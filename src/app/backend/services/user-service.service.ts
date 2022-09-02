import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../classes/user';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private usersUrl: string;

  constructor( private http: HttpClient ) { 
    this.usersUrl = 'http://959037workmentorspringbooteb-env.eba-mmqrcbsc.us-west-2.elasticbeanstalk.com/users';
  }

  public findAll() : Observable<User[]> {
    return this.http.get<User[]>(this.usersUrl);
  }

  public get( id : number ) : Observable<User> {
    let newUrl = this.usersUrl + "/" + id;
    return this.http.get<User>(newUrl);
  }

  public save( user : User ){
    console.log(user);
    return this.http.post<User>(this.usersUrl, user);
  }

  public update( user : User ){
    console.log(user);
    return this.http.put<User>(this.usersUrl, user);
  } 
}
