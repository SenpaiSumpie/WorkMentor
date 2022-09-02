import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { SignInComponent } from 'src/app/nav-bar/sign-in/sign-in.component';
import { SignUpComponent } from 'src/app/nav-bar/sign-up/sign-up.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CognitoService } from '../../cognito.service';

@Component({
  selector: 'app-search-nav',
  templateUrl: './search-nav.component.html',
  styleUrls: ['./search-nav.component.css']
})
export class SearchNavComponent implements OnInit {

  isAuthenticated: boolean;
  display: boolean;

  search:string = '';
  username : string = "";

  constructor(
    private toastr:ToastrService,
    public dialog:MatDialog,
    private router: Router,
    private cognitoService: CognitoService
  ) { 
    this.isAuthenticated = false;
    this.display = false;
  }

  public ngOnInit(): void {
    this.cognitoService.isAuthenticated()
    .then((success:boolean) =>{
      this.isAuthenticated = success;
      this.display = true;
    }).catch(() => {
      this.display = false;
    });
    this.cognitoService.getUser().then((data)=>{
      if(data != null){
        this.username = data['username'];
      }
    });
    
  }

  public signOutToast(): void{
    this.toastr.success("", "Sign Out Successful!", { 
      timeOut: 5000, 
      progressBar: true, 
      closeButton: true, 
    });
  }

  public signOut(): void{
    this.cognitoService.signOut()
    .then(() =>{
      this.signOutToast();
      this.router.navigate(['']);
      this.isAuthenticated = false;
    });
  }

  openSignIn(): void {
    const dialogRef = this.dialog.open(SignInComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  openSignUp(): void {
    const dialogRef = this.dialog.open(SignUpComponent, {
      width: '500px'
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  refresh() : void{
    setTimeout(()=>{
      window.location.reload();
    }, 100);
  }

  public showMenu(): void{
    let menu = document.getElementById('nav-ul');

    if(menu?.classList.contains('nav-ul-hide')){
      menu?.classList.remove('nav-ul-hide');
      menu?.classList.add('nav-ul');
    } else{
      menu?.classList.remove('nav-ul');
      menu?.classList.add('nav-ul-hide');
    }
  }

}
