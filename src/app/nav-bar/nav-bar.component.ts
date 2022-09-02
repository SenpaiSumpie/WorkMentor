import { Component, HostListener, OnInit } from '@angular/core';

import { MatDialog } from '@angular/material/dialog';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { CognitoService } from '../cognito.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  isAuthenticated: boolean;
  display: boolean;

  search: string = "";
  username : string = "";
  email : string = "";

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
        this.email = data.attributes['email'];
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
      width: '500px',
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

  @HostListener('window:scroll', ['event']) onScrollEvent($event : Event) {
    let navBar = document.getElementById('nav-bar');
    let lightLogo = document.getElementById('light-logo');
    let darkLogo = document.getElementById('dark-logo');
    let subNavBar = document.getElementById('sub-nav-bar');
    let navBarItems = document.getElementById('nav-bar-items');

    let searchBar = document.getElementById('search-bar-container');

    if(window.scrollY === 0)
    {
      navBar?.classList.remove('not-top');
      navBar?.classList.add('top');

      // Logos
      lightLogo?.classList.remove('hide-logo');
      darkLogo?.classList.add('hide-logo');

      // Sub nav bar
      subNavBar?.classList.add('hide-sub-nav-bar');

      // Search Bar
      searchBar?.classList.add('hidden');

      // Nav bar items
      navBarItems?.classList.add('nav-bar-items');
    } else {
      navBar?.classList.remove('top');
      navBar?.classList.add('not-top');

      // Logos
      darkLogo?.classList.remove('hide-logo');
      lightLogo?.classList.add('hide-logo');

      // Sub nav bar
      subNavBar?.classList.remove('hide-sub-nav-bar');

      // Search Bar
      searchBar?.classList.remove('hidden');

      // Nav bar items
      navBarItems?.classList.remove('nav-bar-items');
    }
  }
}
