import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { CognitoService } from './cognito.service';

describe('AppComponent', () => {
  let component : jasmine.SpyObj<AppComponent>;
  let router : jasmine.SpyObj<Router>;
  let cognitoService : jasmine.SpyObj<CognitoService>;

  beforeEach(async () => {
    component = jasmine.createSpyObj<AppComponent>(['signOut']);
    router = jasmine.createSpyObj<Router>('Router', ['navigate']);
    cognitoService = jasmine.createSpyObj<CognitoService>('CognitoService', ['signOut', 'isAuthenticated']);

    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: CognitoService, useValue: cognitoService}
      ],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
    
    fixture.detectChanges();
    expect(cognitoService.isAuthenticated).toHaveBeenCalled();
  });


  it('should sign out', () =>{
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    app.signOut();
    expect(cognitoService.signOut).toHaveBeenCalled();
    
  });

});
