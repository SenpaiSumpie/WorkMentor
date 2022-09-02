import { Component, Inject } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

import { IUser, CognitoService } from '../../cognito.service';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';



@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent {

  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);
  loading: boolean;
  user: IUser;

  constructor(
    private toastr:ToastrService,
    public dialogRef:MatDialogRef<SignInComponent>,
    private router: Router,
    private cognitoService: CognitoService
  ){
    this.loading = false;
    this.user = {} as IUser;
  }

  onNoClick() : void {
    this.dialogRef.close();
  }

  public signIn(): void{
    this.loading = true;
    this.cognitoService.signIn(this.user)
    .then(() => {
      this.showToast();
      this.onNoClick();
      this.router.navigate(['/profile']);
    }).catch(() =>{
      this.showFailure();
      this.loading = false;
    });
  }

  showToast() : void {
    this.toastr.success("", "Sign In Successful!", { 
      timeOut: 5000, 
      progressBar: true, 
      closeButton: true, 
    });
  }

  showFailure() : void {
    this.toastr.error("", "Username, Email, or Password Incorrect", { 
      timeOut: 5000, 
      progressBar: true, 
      closeButton: true, 
    });
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : '';
  }

}
