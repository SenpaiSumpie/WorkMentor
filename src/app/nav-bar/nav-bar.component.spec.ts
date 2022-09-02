import { CdkPortal } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { NavBarComponent } from './nav-bar.component';

describe('NavBarComponent', () => {
  let component: NavBarComponent,
    httpTestingController: HttpTestingController,
    toastService: jasmine.SpyObj<ToastrService>,
    notificationServiceSpy: any,
    matDialog: jasmine.SpyObj<MatDialog>;  
  let fixture: ComponentFixture<NavBarComponent>;

  beforeEach(async () => {
    toastService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    matDialog = jasmine.createSpyObj<MatDialog>(['open']);

    await TestBed.configureTestingModule({
      imports: [
        CommonModule,
        MatDialogModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientTestingModule,
        BrowserAnimationsModule,
        RouterTestingModule.withRoutes([]),
        ToastrModule.forRoot()],
      declarations: [ NavBarComponent ],
      providers: [
        NavBarComponent,
        MatDialogModule,
        {provide: ToastrService, useValue: toastService}
      ],
    })
    .compileComponents();

    component = TestBed.inject(NavBarComponent);
    httpTestingController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(NavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test "signOutToast" method', () =>{
    component.signOutToast();
    expect(toastService.success).toHaveBeenCalledWith("", "Sign Out Successful!", { timeOut: 5000, progressBar: true, closeButton: true })
  });

  it('should do something on window scroll', () => {
    window.dispatchEvent(new Event('scroll'));
    expect(document.getElementById('nav-bar')).toBeTruthy();
  });

  it('should signOut', () => {
    component.signOut();
  });

  /*
  it('should signIn', () => {
    component.openSignIn();
  });
  */ 

  it('should openSignUp', ()=> {
    component.openSignUp();
  });

  it('should openMenu', () => {
    component.showMenu();
  });

});
