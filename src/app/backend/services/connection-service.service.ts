import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Connection } from '../classes/connection';

@Injectable({
  providedIn: 'root'
})
export class ConnectionServiceService {

  private usersUrl: string;

  constructor( private http: HttpClient ) { 
    this.usersUrl = 'http://959037workmentorspringbooteb-env.eba-mmqrcbsc.us-west-2.elasticbeanstalk.com/connections';
  }

  public findAll() : Observable<Connection[]> {
    return this.http.get<Connection[]>(this.usersUrl);
  }

  public get( id : number ) : Observable<Connection> {
    let newUrl = this.usersUrl + "/" + id;
    return this.http.get<Connection>(newUrl);
  }

  public save( connection : Connection ){
    console.log(connection);
    return this.http.post<Connection>(this.usersUrl, connection);
  }

  public update( connection : Connection ){
    console.log(connection);
    return this.http.put<Connection>(this.usersUrl, connection);
  } 
}
