import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule, ToastrService } from 'ngx-toastr';

import { SearchNavComponent } from './search-nav.component';

describe('SearchNavComponent', () => {
  let component: SearchNavComponent;
  let fixture: ComponentFixture<SearchNavComponent>;
  let toastrService: jasmine.SpyObj<ToastrService>;
  let dialog : jasmine.SpyObj<MatDialog>;
  let router : jasmine.SpyObj<Router>;

  beforeEach(async () => {
    toastrService = jasmine.createSpyObj<ToastrService>('ToasterService', ['error', 'success']);
    dialog = jasmine.createSpyObj<MatDialog>(['open']);
    router = jasmine.createSpyObj<Router>(['navigate']);

    await TestBed.configureTestingModule({
      imports:[
        MatDialogModule,
        FormsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        BrowserAnimationsModule,
        RouterTestingModule,
        ToastrModule.forRoot()
      ],
      declarations: [ SearchNavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should sign out toast', () => {
    component.signOutToast();
    /*expect(toastrService.success).toHaveBeenCalledWith("", "Sign Out Successful!", { 
      timeOut: 5000, 
      progressBar: true, 
      closeButton: true, 
    });*/
});

  it('should signOut', () => {
    component.signOut();
  });

  /*
  it('should openSignIn', () => {
    component.openSignIn();
  });*/ 

  it('should openSignUp', () => {
    component.openSignUp();
  });

  /*
  it('should refresh', () => {
    component.refresh();
  });*/

  it('should show menu', () => {
    component.showMenu();
  });

});
