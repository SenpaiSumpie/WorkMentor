import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, RouteConfigLoadEnd, Router, UrlSegment } from '@angular/router';
import { User } from 'src/app/backend/classes/user';
import { UserServiceService } from 'src/app/backend/services/user-service.service';
import { CognitoService } from 'src/app/cognito.service';

@Component({
  selector: 'app-mentor-page-content',
  templateUrl: './mentor-page-content.component.html',
  styleUrls: ['./mentor-page-content.component.css']
})
export class MentorPageContentComponent implements OnInit {
  
  mentor : User;
  loading : boolean;

  theUser : User;
  dumbUserList: User[] = [];
  username: string;
  email : string;
  searchField : number = 0;

  constructor(
    private _ActivatedRoute : ActivatedRoute,
    private cognitoService : CognitoService,
    private userService: UserServiceService,
    private _Router : Router
  ) { 
    this.loading = true;
    this.mentor = {} as User;
    this.theUser = {} as User;
    this.username = "";
    this.email = "";
  }

  ngOnInit(): void {
    console.log(this._ActivatedRoute.params);
    this.cognitoService.getUser().then((data) =>{
      if(data != null){
        this.username = data['username'];
        this.email = data.attributes['email'];
      }
    });

    this._ActivatedRoute.params.subscribe(params =>{
      this.searchField = params['mentorId'];
    });

    this.userService.get(this.searchField).subscribe(result =>{
      this.mentor = result;
    });

    

    this.userService.findAll().subscribe(data =>{
      this.dumbUserList = data.filter(result =>{
        return (result.email == this.email && result.username == this.username);
      });

      this.theUser = this.dumbUserList[0];
      this.loading = false;
    });
  }

}
