import { Component, Inject} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {FormControl, Validators} from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

import { IUser, CognitoService } from '../../cognito.service';
import { User } from 'src/app/backend/classes/user';
import { UserServiceService } from 'src/app/backend/services/user-service.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {


  loading: boolean;
  isConfirm: boolean;
  user: IUser;

  newUser : User;

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
    private toastr:ToastrService,
    public dialogRef:MatDialogRef<SignUpComponent>,
    private router: Router,
    private cognitoService: CognitoService,
    private userService : UserServiceService
  ){
    this.loading = false;
    this.isConfirm = false;
    this.user = {} as IUser;
    this.newUser = {} as User;
  }

  public signUp(): void{
    this.loading = true;
    console.log(this.user);
    this.cognitoService.signUp(this.user)
    .then(()=> {
      this.loading = false;
      this.isConfirm = true;
      this.cognitoService.signIn(this.user);
      this.showToast();
    }).catch(()=>{
      this.loading = false;
      this.showFailure();
    });

    this.addUserToDatabase();
  }

  public addUserToDatabase() : void{
    const monthNames = ["January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    this.newUser.email = this.user.email;
    this.newUser.username = this.user.userName;
    this.newUser.firstName = "";
    this.newUser.lastName = "";
    this.newUser.jobTitle = "";
    this.newUser.location = "";
    this.newUser.memberSince = monthNames[new Date().getMonth()] + ' ' + new Date().getFullYear().toString();
    // This portal is mentee status
    this.newUser.memberType = "Mentee";
    this.newUser.successStory = "";
    this.newUser.workHistory = "";

    this.userService.save(this.newUser).subscribe(result => console.log(result));
  }


  public confirmSignUp(): void{
    this.loading = true;
    this.cognitoService.confirmSignUp(this.user)
    .then(()=>{
      this.router.navigate(['/profile']);
    }).catch(() => {
      this.loading = false;
    });
  }

  onNoClick() : void {
    this.dialogRef.close();
  }

  showToast() : void {
    this.toastr.success("", "Sign Up successful!", 
    { timeOut: 5000, 
      progressBar: true, 
      closeButton: true })
  }

  showFailure() : void {
    this.toastr.error("", "Sign Up Failed!", 
    { timeOut: 5000, 
      progressBar: true, 
      closeButton: true })
  }


  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
