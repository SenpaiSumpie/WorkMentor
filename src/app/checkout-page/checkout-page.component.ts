import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Connection } from '../backend/classes/connection';
import { User } from '../backend/classes/user';
import { ConnectionServiceService } from '../backend/services/connection-service.service';
import { UserServiceService } from '../backend/services/user-service.service';
import { CognitoService } from '../cognito.service';

@Component({
  selector: 'app-checkout-page',
  templateUrl: './checkout-page.component.html',
  styleUrls: ['./checkout-page.component.css']
})
export class CheckoutPageComponent implements OnInit {

  loading : boolean;
  mentorshipLoading : boolean;
  mentor : User ;
  theUser : User;

  newConnection : Connection;
  isThereConnection : Connection[] = [];
  dumbUserList : User[] = [];

  username : string;
  email : string;
  searchField : number = 0;
  package : string;

  subtotal : number = 0;
  serviceFee : number = 0;
  total : number = 0;

  constructor(
    private activatedRoute : ActivatedRoute,
    private cognitoService: CognitoService,
    private userService : UserServiceService,
    private connectionService : ConnectionServiceService,
    private toastr:ToastrService,
    private _Router : Router,
  ) { 
    this.loading = true;
    this.mentorshipLoading = false;
    this.mentor = {} as User;
    this.theUser = {} as User;
    this.newConnection = {} as Connection;
    this.username = "";
    this.email = "";
    this.package = "";
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params =>{
      this.searchField = params['mentorId'];
      this.package = params['package'];
      
      if(this.package == 'basic'){
        this.subtotal = 10.00;
        this.serviceFee = this.subtotal * 0.25;
      }
      if(this.package == 'standard'){
        this.subtotal = 25.00;
        this.serviceFee = this.subtotal * 0.21;
      }
      if(this.package == 'premium'){
        this.subtotal = 100.00;
        this.serviceFee = this.subtotal * 0.125;
      }
      
      this.total = this.subtotal + this.serviceFee;
    });

    this.userService.get(this.searchField).subscribe(result =>{
      this.mentor = result;
    });

    this.cognitoService.getUser().then((data) =>{
      if(data != null){
        this.username = data['username'];
        this.email = data.attributes['email'];
      }
    });

    this.userService.findAll().subscribe(data =>{
      this.dumbUserList = data.filter(result =>{
        return (result.email == this.email && result.username == this.username);
      });

      this.theUser = this.dumbUserList[0];
      this.loading = false;
    });
  }

  requestMentorShip() : void {

    this.mentorshipLoading = true;

    this.connectionService.findAll().subscribe(data =>{
      this.isThereConnection = data.filter( result =>{

        return( result.mentee == this.email && result.mentor == this.mentor.email);
      });

      if(this.isThereConnection.length == 0){
        this.newConnection.accepted = false;
        this.newConnection.archived = false;
        this.newConnection.mentee = this.email;
        this.newConnection.mentor = this.mentor.email;
    
    
        this.connectionService.save(this.newConnection).subscribe(result => {
          console.log(result);
          this.toastr.success("", "Mentorship requested", 
          { timeOut: 5000, 
            progressBar: true, 
            closeButton: true });
          this.mentorshipLoading = false;
        });
      } else {
        console.log("Failed");
        this.toastr.error("", "Mentorship request failed", 
          { timeOut: 5000, 
            progressBar: true, 
            closeButton: true });
        this.mentorshipLoading = false;
      }
    });
  }

}
