import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Messages } from '../classes/messages';

@Injectable({
  providedIn: 'root'
})
export class MessagesServiceService {

  private usersUrl: string;

  constructor( private http: HttpClient ) { 
    this.usersUrl = 'http://959037workmentorspringbooteb-env.eba-mmqrcbsc.us-west-2.elasticbeanstalk.com/messages';
  }

  public findAll() : Observable<Messages[]> {
    return this.http.get<Messages[]>(this.usersUrl);
  }

  public get( id : number ) : Observable<Messages> {
    let newUrl = this.usersUrl + "/" + id;
    return this.http.get<Messages>(newUrl);
  }

  public save( messages : Messages ){
    console.log(messages);
    return this.http.post<Messages>(this.usersUrl, messages);
  }

  public update( messages : Messages ){
    console.log(messages);
    return this.http.put<Messages>(this.usersUrl, messages);
  } 
}
